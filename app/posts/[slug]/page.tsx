/*
import { PostPageComponent } from "@/components/app/posts/post-page";
import client from "@/tina/__generated__/client";
import { notFound } from "next/navigation";

export default async function PostPage({ params, }: {
params: { slug: string } }) {
    const result = await client.queries
    .post({ relativePath: `${params.slug}.mdx` })
    .then((result) =>{
       return result
      })
    .catch((err) =>{
        console.error(err)
        return notFound()
    })
    return <PostPageComponent {...result} />
  }
*/
import { PageComponent } from "@/components/app/page";
import client from "@/tina/__generated__/client";
import { notFound } from "next/navigation";

// This function fetches all possible slugs for static generation
export async function generateStaticParams() {
  try {
    // Fetch a list of slugs from your data source
    const slugs = await client.queries

    // Return an array of objects with `slug` properties
    return slugs.map((slug: string) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error("Failed to fetch slugs", error);
    return [];
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const result = await client.queries
    .page({ relativePath: `${params.slug}.mdx` })
    .then((result) => result)
    .catch((err) => {
      console.error(err);
      return notFound();
    });

  return <PageComponent {...result} />;
}
