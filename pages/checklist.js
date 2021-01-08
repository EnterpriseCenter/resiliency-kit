import React, { useState, useEffect } from 'react'
import {
    getChecklistPageData,
    getQuestionsData,
    getChecklistActionsData,
} from '@/lib/api'
import Head from 'next/head'
import useStickyState from '@/lib/useStickyState'
import normalize from '@/lib/normalize'
import Layout from '@/components/global/Layout'
import Form from '@/components/form/Form'
import Checklist from '@/components/checklist/Checklist'

export default function Resources({
    doc,
    globals,
    questions,
    checklistItems,
    checklistHelpContent,
    checklistActionsContent,
}) {
    const [showForm, setShowForm] = useState(true)
    const [answersData, setAnswersData] = useStickyState([], 'formData')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [answersData])

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

            <div className="container mx-auto py-2 md:py-5">
                {!answersData || answersData.length === 0 ? (
                    <Form
                        skipText={doc?.skip_form_text}
                        hideForm={() => setShowForm(false)}
                        questions={questions}
                        setAnswersData={setAnswersData}
                        buttons={globals}
                    />
                ) : (
                    <Checklist
                        doc={doc}
                        questions={questions}
                        answers={answersData}
                        checklistItems={checklistItems}
                        checklistHelpContent={checklistHelpContent}
                        checklistActionsContent={checklistActionsContent}
                    />
                )}
            </div>
        </Layout>
    )
}

Resources.defaultProps = {
    checklistItems: [],
    questions: [],
}

export async function getStaticProps({ locale }) {
    const data = await getChecklistPageData(locale)
    const questionsData = await getQuestionsData(locale)
    const checklistActionsData = await getChecklistActionsData(locale)

    const doc = data.allResources_pages.edges.length
        ? data.allResources_pages.edges[0].node
        : null

    const globals = data.allGlobalss.edges.length
        ? data.allGlobalss.edges[0].node
        : null

    const questions = questionsData.allQualifiers.edges.length
        ? questionsData.allQualifiers.edges.map(edge => ({
              ...edge.node,
              slug: edge.node.question.replace(/\s+/g, '-').toLowerCase(),
          }))
        : null

    const checklistItems = doc.body
        ? doc.body.map(slice =>
              slice.fields.map(field => ({
                  ...field.checklist_item,
                  category: slice.primary.category_name,
              }))
          )
        : null

    const checklistHelpContent = checklistActionsData.allGlobalss.edges.length
        ? checklistActionsData.allGlobalss.edges[0].node
        : null

    const checklistActionsContent = checklistActionsData.allResources_pages
        .edges.length
        ? checklistActionsData.allResources_pages.edges[0].node
        : null

    return {
        props: {
            doc,
            globals,
            questions,
            checklistHelpContent,
            checklistActionsContent,
            checklistItems: normalize([].concat.apply([], checklistItems)),
        },
        revalidate: 1,
    }
}
