import { useQuery } from "@tanstack/react-query";
import { getAlbums, getPosts } from "~/lib/services/api-services";

export default function About() {
  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["getAlbums"],
    queryFn: getAlbums,
  });

  if (isError) {
    return <div>{error?.message}</div>;
  }

  console.log("[Line: 14] data :>> ", data);

  return (
    <div>
      About UI
      {data?.code === "success" &&
        data?.data?.map((item) => <div>{item?.title}</div>)}
    </div>
  );
}
