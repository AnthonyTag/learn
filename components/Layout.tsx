import * as React from 'react'
import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'
import { GA_TRACKING_ID } from '../lib/gtag'

interface LayoutProps {
    meta?: {
        title?: string
        description?: string
        image?: string
        icon?: string
    }
    location?: {
        pathname?: string
    }
    children: React.ReactNode
    minimal?: boolean

    hero?: React.ReactFragment
    heroAndHeaderClassName?: string

    className?: string
}

export default function Layout(props: LayoutProps) {
    const defaultMetaProps: LayoutProps['meta'] = {
        title: 'Sourcegraph - Universal Code Search',
        description: 'Find and fix things across all of your code with Sourcegraph universal code search.',
        image: 'https://about.sourcegraph.com/sourcegraph-mark.png',
        icon: 'https://about.sourcegraph.com/favicon.png',
    }
    const metaProps = { ...defaultMetaProps, ...props.meta }

    return (
        <div className={`flex flex-column fill-height ${props.className || ''}`}>
            <Head>
                <title>{metaProps.title}</title>

                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
                    rel="stylesheet"
                />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-40540747-22`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-40540747-22', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
            </Head>
            <div className={props.heroAndHeaderClassName}>
                <Header minimal={props.minimal} className={`${props.className || ''}`} />
                {props.hero}
            </div>
            <section className="d-flex flex-column fill-height">{props.children}</section>
            <Footer minimal={props.minimal} />
        </div>
    )
}