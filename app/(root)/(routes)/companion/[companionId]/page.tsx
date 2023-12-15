import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { CompanionForm } from "./components/campanion-form";
import { redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
    params: {
        companionId: string;
    }
}


const CompanionIdPage = async ({params} : CompanionIdPageProps) => {

    const { userId } = auth();

    if(!userId) {
        return redirectToSignIn();
    }

    const companion = await prismadb.companion.findUnique({
        where: {

            id: params.companionId,
            userId
        }
    });

    const categories = await prismadb.category.findMany();


    return (
        <CompanionForm initialData={companion} categories={categories}/>

    );
}

export default CompanionIdPage;