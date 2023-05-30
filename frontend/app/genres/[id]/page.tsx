export default function Genre({ params }: { params: { id: string } }) {
  return <h1>Genre ID: {params.id}</h1>;
}
