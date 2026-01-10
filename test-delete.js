
async function testDelete() {
    try {
        console.log('Testing DELETE /api/admin/services...');
        const res = await fetch('http://localhost:3000/api/admin/services', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 'test-id-123' })
        });

        console.log('Status:', res.status);
        console.log('Status Text:', res.statusText);
        const text = await res.text();
        console.log('Body:', text);
    } catch (e) {
        console.error('Error:', e);
    }
}

testDelete();
