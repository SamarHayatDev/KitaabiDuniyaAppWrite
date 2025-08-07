"use client";
import { useEffect } from "react";
import { graphql } from "@/lib/appwrite/config";

const DBGraphQLTest = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          query ListDocuments {
            databasesListDocuments(
              databaseId: "${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}",
              collectionId: "6894bf11000015b5ba60"
            ) {
              title
              
            }
          }
        `;
        const res = await graphql.query({ query });
        console.log("GraphQL documents:", res);
      } catch (err) {
        console.error("GraphQL error:", err);
      }
    };
    fetchData();
  }, []);
  return <div>DB GraphQL fetch test (check console)</div>;
};

export default DBGraphQLTest;
