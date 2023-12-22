"use client";

import { Breadcrumbs, BreadcrumbItem, Card, CardBody } from "@nextui-org/react";

export default function CommitmentPage() {
  return (
    <div className="h-dvh flex flex-col p-4 pb-8 gap-4">
      <Breadcrumbs underline="hover">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Commitment</BreadcrumbItem>
      </Breadcrumbs>
      <Card>
        <CardBody>
          <p className="text-sm text-neutral-500">
            This page is currently under development.
          </p>
        </CardBody>
      </Card>
      <div className="flex flex-col gap-4">
        <div className="">
          <div className="font-bold">Offset Environment Impact</div>
          <div>
            {`I donate 1% of my revenue to local environmental governments.`}
          </div>
        </div>
      </div>
    </div>
  );
}
