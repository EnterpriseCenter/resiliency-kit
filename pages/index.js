import { getHomepage } from '@/lib/api'
import Layout from '@/components/global/Layout'
import Homepage from '@/components/homepage/Homepage'
import Head from 'next/head'

export default function Index({ doc, people, globals }) {
    return (
        <Layout layoutContent={globals}>
            <Head>
                <title>
                    {doc.meta_title} | {doc.page_title}
                </title>
                <meta name="title" content={doc.meta_title} />
                <meta name="description" content={doc.meta_description} />
                <meta property="og:title" content={doc.meta_title} />
                <meta property="og:image" content={doc.open_graph_image.url} />
            </Head>
            <Homepage doc={doc} people={people} globals={globals} />
        </Layout>
    )
}

export async function getStaticProps({ locale }) {
    const data = await getHomepage(locale)

    const doc = data.allHomepages.edges.length
        ? data.allHomepages.edges[0].node
        : null

    const globals = data.allGlobalss.edges.length
        ? data.allGlobalss.edges[0].node
        : null

    const people = data.allPersons.edges.length
        ? data.allPersons.edges.map(edge => edge.node)
        : null

    return {
        props: {
            doc,
            people,
            globals,
        },
        revalidate: 1,
    }
}
