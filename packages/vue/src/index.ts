import type { VNode } from 'vue'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

import type { Node, NodeResolver, SbRichtextOptions } from '@storyblok/richtext-resolver'
import { BlockTypes, MarkTypes, RichTextResolver } from '@storyblok/richtext-resolver'
import { StoryblokComponent } from '@storyblok/vue'
import SbRichText from './components/SbRichText.vue'

const componentResolver: NodeResolver<VNode> = (node: Node<VNode>): VNode => {
  return h(StoryblokComponent, {
    blok: node?.attrs?.body[0],
    id: node.attrs?.id,
  }, node.children)
}

export function useSbRichtextResolver(options: SbRichtextOptions<VNode>) {
  const mergedOptions: SbRichtextOptions<VNode> = {
    renderFn: h,
    resolvers: {
      [MarkTypes.LINK]: (node: Node<VNode>) => {
        return node.attrs?.linktype === 'STORY'
          ? h(RouterLink, {
            to: node.attrs?.href,
            target: node.attrs?.target,
          }, node.text)
          : h('a', {
            href: node.attrs?.href,
            target: node.attrs?.target,
          }, node.text)
      },
      [BlockTypes.COMPONENT]: componentResolver,
      /* ...options.resolvers, */
    },
  }
  return RichTextResolver<VNode>(mergedOptions)
}

export { SbRichText }
