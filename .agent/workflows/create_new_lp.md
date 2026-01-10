---
description: Create a new Service/Landing Page
---
1. **Gather Information**: Ask the user for the following details about the new LP. If they provide incomplete info, you can offer to generate plausible placeholders based on the topic.
    - **Slug** (URL path, e.g., `email-marketing`)
    - **Title** (Navigation Title, e.g., `Email Marketing`)
    - **UVP Title** (Main Headline, e.g., `Converti ogni click in cliente.`)
    - **UVP Subtitle** (Subheadline)
    - **CTA Text** (Button text)
    - **Description** (Brief intro paragraph)
    - **Stats** (3 items: value + label)
    - **Benefits** (5 items: title + description)
    - **FAQ** (3-4 items: question + answer)
    - **Testimonials** (3 items: quote, author, company, result)
    - **Comparison** (5 items: feature, diy, agency, wrdigital)

2. **Read Data**: Read `data/services.ts` to understand the exact schema and context.

3. **Implement**: 
    - Use `replace_file_content` to append the new entry to the `servicesData` object in `data/services.ts`.
    - Ensure you add it *before* the closing brace `};` of the object.
    - Maintain strict TypeScript type conformity.

4. **Verify**: Confirm to the user that the page is now accessible at `/servizi/[slug]`.
