import Prismic from 'prismic-javascript'
import { localeWithRegion } from '@/lib/localeFormat'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

export const PrismicClient = Prismic.client(REF_API_URL, {
    accessToken: API_TOKEN,
})

export async function fetchAPI(query, { variables } = {}) {
    const prismicAPI = await PrismicClient.getApi()
    const res = await fetch(
        `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(
            variables
        )}`,
        {
            headers: {
                'Prismic-Ref': prismicAPI.masterRef.ref,
                'Content-Type': 'application/json',
                // 'Accept-Language': API_LOCALE,
                Authorization: `Token ${API_TOKEN}`,
            },
        }
    )

    if (res.status !== 200) {
        // TODO: remove
        throw new Error('Failed to fetch API')
    }

    const json = await res.json()
    if (json.errors) {
        // TODO: remove
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getHomepage(locale) {
    const lang = localeWithRegion(locale)

    const data = await fetchAPI(
        `
          query($lang: String) {
            allHomepages(lang: $lang) {
              edges {
                node {
                  heading
                  time_promise
                  data_security_promise
                  page_title
                  meta_title
                  meta_description
                  open_graph_image
                }
              }
            }
            allPersons(lang: $lang) {
              edges {
                node {
                  name
                  title
                  photo
                  business_name
                  location
                  link_to_business_website
                }
              }
            }
            allGlobalss(lang: $lang) {
              edges {
                node {
                  about_button_text
                  button_cta
                  button_cta_returning_users
                  footer_content
                }
              }
            }
          }
        `,
        {
            variables: {
                lang,
            },
        }
    )

    return data
}

export async function getAbout(locale) {
    const lang = localeWithRegion(locale)

    const data = await fetchAPI(
        `
          query($lang: String) {
            allAbouts(lang: $lang) {
              edges {
                node {
                  page_heading
                  page_content
                  page_title
                  meta_title
                  meta_description
                  open_graph_image
                }
              }
            }
            allGlobalss(lang: $lang) {
              edges {
                node {
                  about_button_text
                  button_cta
                  button_cta_returning_users
                  footer_content
                }
              }
            }
          }
        `,
        {
            variables: {
                lang,
            },
        }
    )

    return data
}

export async function getChecklistPageData(locale) {
    const lang = localeWithRegion(locale)

    const data = await fetchAPI(
        `
          query($lang: String) {
            allResources_pages(lang: $lang) {
              edges {
                node {
                  page_headline
                  intro
                  pre_checklist_content
                  end_of_checklist_content
                  enable_print_button_in_footer
                  skip_form_text
                  page_title
                  meta_title
                  meta_description
                  open_graph_image
                  body {
                    ... on Resources_pageBodyCategory {
                      primary {
                        category_name
                      }
                      fields {
                        checklist_item {
                          ... on Checklist_item {
                            _meta {
                              id
                            }
                            title
                            description
                            related_resources {
                              resource_type
                              resource_name
                              url
                            }
                            applies_to_all
                            business_type {
                              answer {
                                ... on Answer {
                                  answer_title
                                }
                              }
                            }
                            employees {
                              answer {
                                ... on Answer {
                                  answer_title
                                }
                              }
                            }
                            sectors {
                              answer {
                                ... on Answer {
                                  answer_title
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            allGlobalss(lang: $lang) {
              edges {
                node {
                  about_button_text
                  button_cta
                  button_cta_returning_users
                  footer_content
                  form_continue_button
                  form_skip_button
                  form_submit_button
                }
              }
            }
          }
        `,
        {
            variables: {
                lang,
            },
        }
    )

    return data
}

export async function getQuestionsData(locale) {
    const lang = localeWithRegion(locale)

    const data = await fetchAPI(
        `
    query($lang: String) {
      allQualifiers(lang: $lang, sortBy: order_ASC) {
        edges {
          node {
            _meta {
              id
            }
            question
            question_description
            question_type
            question_identifier
            submit_button_text
            submit_button_text_alt
            skip_button_text
            answers {
              answer {
                ... on Answer {
                  _meta {
                    id
                  }
                  answer_title
                  answer_description
                }
              }
            }
          }
        }
      }
    }
    `,
        {
            variables: {
                lang,
            },
        }
    )

    return data
}

export async function getChecklistActionsData(locale) {
    const lang = localeWithRegion(locale)

    const data = await fetchAPI(
        `
        query($lang: String) {
          allResources_pages(lang: $lang) {
            edges {
              node {
                actions_menu_button_text
                action_item__print
                action_item__uncheck_all
                action_item__change_answers
                action_item__start_over
                confirmation_cancel_button_text
                uncheck_all_confirmation_title
                uncheck_all_confirmation_text
                change_answers_confirmation_title
                change_answers_confirmation_text
                start_over_confirmation_title
                start_over_confirmation_text
              }
            }
          }
          allGlobalss(lang: $lang) {
            edges {
              node {
                help_button_text
                help_content_step_1_headline
                help_content_step_1
                help_content_step_1_button_text
                help_content_step_2
                help_content_step_2_button_text
                help_drawer_collapse_text
              }
            }
          }
        }

      `,
        {
            variables: {
                lang,
            },
        }
    )

    return data
}
