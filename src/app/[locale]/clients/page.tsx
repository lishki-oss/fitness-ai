import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, User } from "lucide-react";
import type { Client, Questionnaire } from "@/generated/prisma/client";

type ClientWithQuestionnaire = Client & { questionnaire: Questionnaire | null };

export default async function ClientsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const clients = await prisma.client.findMany({
    where: { trainerId: session.user.id },
    include: { questionnaire: true },
    orderBy: { createdAt: "desc" },
  });

  return <ClientsPageContent clients={clients as ClientWithQuestionnaire[]} />;
}

function ClientsPageContent({
  clients,
}: {
  clients: ClientWithQuestionnaire[];
}) {
  const t = useTranslations("clients");
  const tGoals = useTranslations("questionnaire.goals.goalOptions");

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Link href="/clients/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("addNew")}
          </Button>
        </Link>
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t("noClients")}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <Link key={client.id} href={`/clients/${client.id}`}>
              <Card className="transition-colors hover:bg-accent/50 cursor-pointer">
                <CardHeader className="py-4 px-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {client.questionnaire
                          ? `${client.questionnaire.firstName} ${client.questionnaire.lastName}`
                          : "—"}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {t("createdAt")}:{" "}
                        {new Date(client.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {client.questionnaire && (
                        <>
                          <Badge variant="outline">
                            {t("age")}: {client.questionnaire.age}
                          </Badge>
                          <Badge variant="secondary">
                            {tGoals(client.questionnaire.primaryGoal)}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
