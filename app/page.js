"use client";

import { Button, Link } from "@nextui-org/react";

export default function Home() {
  const links = [
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/titipat",
      isExternal: true,
    },
    {
      text: "Publications",
      href: "https://scholar.google.com/citations?hl=th&user=Ywk8t4AAAAAJ&view_op=list_works&sortby=pubdate",
      isExternal: true,
    },
  ];

  if (process.env.NODE_ENV === "development") {
    links.push({
      text: "Commitment",
      href: "/commitment",
    });
  }

  return (
    <div className="h-dvh flex flex-col p-4">
      <header className="container mx-auto flex flex-row justify-between">
        <div className="hidden sm:block font-semibold">Titipat.net</div>
        <div className="grow sm:grow-0 flex flex-row justify-around gap-2">
          {links.map((link, index) => {
            const { text, href, isExternal } = link;
            return (
              <Link
                key={index}
                href={href}
                color="foreground"
                underline="hover"
                isExternal={isExternal || false}
                showAnchorIcon={isExternal || false}
              >
                {text}
              </Link>
            );
          })}
        </div>
      </header>
      <main className="grow flex flex-col justify-center gap-8 items-center">
        <div className="text-4xl">{`I'm Titipat`}</div>

        <div className="text-md sm:text-lg text-pretty text-center">{`Full-stack web developer from Thailand`}</div>

        <Button
          className="font-semibold"
          color="primary"
          variant="shadow"
          radius="full"
          as={Link}
          href="https://cal.com/titipat"
          isExternal={true}
          showAnchorIcon={true}
        >
          Make an Appointment
        </Button>
      </main>
    </div>
  );
}
