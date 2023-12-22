"use client";

export default function Home() {
  return (
    <>
      <main className="p-4 grow flex flex-col justify-center gap-8">
        <div className="text-3xl text-center font-bold text-gray-900 dark:text-gray-100">
          {`I'm Titipat`}
        </div>

        <div className="text-center text-gray-700 dark:text-gray-300">
          {`Full-stack web developer from Thailand`}
        </div>

        <div className="text-center mt-4 grid md:block">
          <a
            href="https://cal.com/titipat"
            target="_blank"
            className="text-white bg-gray-900 py-2 px-6 dark:bg-gray-100 dark:text-gray-900 font-bold rounded-full"
          >
            Make an Appointment
          </a>
        </div>
      </main>
      <footer className="w-full flex flex-row justify-center gap-4 p-4 mb-4 text-gray-700 dark:text-gray-300 font-bold">
        <a href="https://www.linkedin.com/in/titipat/" target="_blank">
          LinkedIn
        </a>
        <a
          href="https://scholar.google.com/citations?hl=th&user=Ywk8t4AAAAAJ&view_op=list_works&sortby=pubdate"
          target="_blank"
        >
          Publications
        </a>
      </footer>
    </>
  );
}
