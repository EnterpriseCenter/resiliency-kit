import { createClient } from '@prismicio/client'
import { API_TOKEN } from '@/lib/api'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`

function linkResolver(doc) {
    // Pretty URLs for known types
    if (doc.type === 'post') {
        return `/posts/${doc.uid}`
    }

    // Fallback for other types, in case new custom types get created
    return `/${doc.uid}`
}

export default async function preview(req, res) {
    const { token: ref, documentId } = req.query

    const client = createClient(REF_API_URL, { accessToken: API_TOKEN })
    const url = await client.resolvePreviewURL({
        linkResolver,
        defaultURL: '/',
        previewToken: ref,
        documentId,
    })

    if (!url) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        ref, // pass the ref to pages so that they can fetch the draft ref
    })

    // Redirect the user to the share endpoint from same origin. This is
    // necessary due to a Chrome bug:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=696204
    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`
    )

    res.end()
}
