import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Built-in variables that auto-update
const BUILTIN_VARIABLES: Record<string, () => string> = {
    '{year}': () => String(new Date().getFullYear()),
    '{month}': () => new Date().toLocaleDateString('it-IT', { month: 'long' }),
    '{today}': () => new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
    '{company}': () => 'W[r]Digital',
    '{phone}': () => '+39 02 1234567',
    '{email}': () => 'info@wrdigital.it',
};

// GET: Lista tutte le variabili
export async function GET() {
    try {
        const dbVariables = await prisma.dynamicVariable.findMany({
            orderBy: { key: 'asc' }
        });

        // Merge built-in with DB variables (DB overrides built-in)
        const builtinList = Object.entries(BUILTIN_VARIABLES).map(([key, fn]) => ({
            key,
            value: fn(),
            autoUpdate: true,
            isBuiltin: true,
            description: `Built-in: ${key}`
        }));

        const dbList = dbVariables.map(v => ({
            ...v,
            isBuiltin: false,
            // Evaluate formula if autoUpdate is true
            value: v.autoUpdate && v.formula ? evalFormula(v.formula) : v.value
        }));

        // Merge: DB variables override built-in by key
        const merged = [...builtinList];
        dbList.forEach(dbVar => {
            const idx = merged.findIndex(m => m.key === dbVar.key);
            if (idx >= 0) {
                merged[idx] = dbVar;
            } else {
                merged.push(dbVar);
            }
        });

        return NextResponse.json(merged);
    } catch (error: any) {
        console.error('Error fetching variables:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Crea o aggiorna variabile
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { key, value, autoUpdate, formula, description } = body;

        if (!key || !key.startsWith('{') || !key.endsWith('}')) {
            return NextResponse.json(
                { error: 'Key must be in format {variable_name}' },
                { status: 400 }
            );
        }

        const variable = await prisma.dynamicVariable.upsert({
            where: { key },
            update: {
                value,
                autoUpdate: autoUpdate || false,
                formula: formula || null,
                description: description || null
            },
            create: {
                key,
                value,
                autoUpdate: autoUpdate || false,
                formula: formula || null,
                description: description || null
            }
        });

        return NextResponse.json({ success: true, variable });
    } catch (error: any) {
        console.error('Error saving variable:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Rimuovi variabile
export async function DELETE(request: NextRequest) {
    try {
        const { key } = await request.json();

        if (!key) {
            return NextResponse.json({ error: 'Key required' }, { status: 400 });
        }

        // Check if it's a built-in (can't delete)
        if (BUILTIN_VARIABLES[key]) {
            return NextResponse.json(
                { error: 'Cannot delete built-in variables. You can override them instead.' },
                { status: 403 }
            );
        }

        await prisma.dynamicVariable.delete({ where: { key } });

        return NextResponse.json({ success: true, message: 'Variable deleted' });
    } catch (error: any) {
        console.error('Error deleting variable:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Helper: Safely evaluate formula (limited subset)
function evalFormula(formula: string): string {
    try {
        // Only allow safe operations
        const safeFormula = formula
            .replace(/new Date\(\)/g, 'new Date()')
            .replace(/\.getFullYear\(\)/g, '.getFullYear()')
            .replace(/\.getMonth\(\)/g, '.getMonth()')
            .replace(/Math\./g, 'Math.');

        // Whitelist check
        if (!/^[\w\s\.\(\)\+\-\*\/\%\d]+$/.test(safeFormula.replace(/new Date\(\)/g, ''))) {
            return '[Invalid Formula]';
        }

        // eslint-disable-next-line no-eval
        return String(eval(safeFormula));
    } catch {
        return '[Error]';
    }
}

// Export parser for use in other components
export function parseVariables(text: string, variables: Map<string, string>): string {
    return text.replace(/\{[\w_]+\}/g, (match) => {
        return variables.get(match) || match;
    });
}
