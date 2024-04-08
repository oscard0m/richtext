import { forwardRef } from 'react'
import { convertAttributesInElement } from './utils'
import { useSbRichtextResolver } from '.'

interface SbRichTextProps {
  doc: any // Try to avoid 'any' by specifying a more accurate type
  resolvers?: any // Same here for resolvers
}

// If you're forwarding a ref to SbRichText
const SbRichText = forwardRef<HTMLDivElement, SbRichTextProps>(({ doc, resolvers }, ref) => {
  // Assuming useSbRichtextResolver is a hook you've created
  const { render } = useSbRichtextResolver({
    resolvers,
  })

  /* const Root = () => render(doc) */
  const html = render(doc)
  const formattedHtml = convertAttributesInElement(html)

  // If you're forwarding a ref, make sure to attach the ref to a DOM element.
  // For example, wrapping <Root /> in a div and attaching the ref to it:
  return <div ref={ref}>{formattedHtml}</div>
})

export default SbRichText
