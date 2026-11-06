import { useParams } from "react-router-dom";

export function DetailsPage() {
  const { name } = useParams<{ name: string }>();

  return (
    <>
      <title>{`${name} | Pokedex`}</title>
      <h1>{`Detail page of ${name}`}</h1>
    </>
  );
}
