import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 pt-8">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-primary">Hello World</h1>
        <p className="text-muted-foreground">Welcome to your styled application</p>
        <code className="font-mono bg-muted p-2 rounded-md">Ready to code!</code>
      </main>
    </div>
  );
}
