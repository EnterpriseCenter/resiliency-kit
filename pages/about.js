import { getAbout } from '@/lib/api'
import Layout from '@/components/global/Layout'
import Head from 'next/head'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '@/lib/linkResolver'

export default function Index({ doc, globals }) {
    return (
        <Layout layoutContent={globals}>
            <Head>
                <title>
                    {doc.meta_title} | {doc.page_title}
                </title>
                <meta name="description" content={doc.meta_description} />
                <meta property="og:title" content={doc.meta_title} />
                <meta property="og:image" content={doc.open_graph_image.url} />
            </Head>

            <div className="container py-10">
                <div className="w-full md:w-2/3 lg:w-1/2">
                    <h1 className="h1 mb-4">
                        {RichText.asText(doc.page_heading)}
                    </h1>
                    <div className="rich-text">
                        <RichText
                            render={doc.page_content}
                            linkResolver={linkResolver}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps({ locale }) {
    const data = await getAbout(locale)

    const doc = data.allAbouts.edges.length
        ? data.allAbouts.edges[0].node
        : null

    const globals = data.allGlobalss.edges.length
        ? data.allGlobalss.edges[0].node
        : null

    return {
        props: {
            doc,
            globals,
        },
        revalidate: 1,
    }
}
