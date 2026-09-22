/** Renders a `<script type="application/ld+json">` tag from a plain data
 * object. JSON.stringify never escapes '<', so a literal "</script>"
 * inside any string value (a FAQ answer, a blog title, brokerage
 * settings - all CMS/admin-editable content) would prematurely close this
 * tag and let the browser parse whatever follows as HTML/script. Escaping
 * '<' to its unicode form defeats that without changing the JSON's
 * meaning (valid JSON permits < anywhere a literal '<' would
 * appear), so this is the one safe way to use dangerouslySetInnerHTML for
 * structured data. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
