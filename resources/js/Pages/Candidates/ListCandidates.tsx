import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Candidate, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

type MyProps = PageProps & {
    candidates: Candidate[];
};

const ListCandidates = ({ auth, candidates }: MyProps) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        List of candidates
                    </h2>
                    <Link href={route("candidates.create")}>
                        <PrimaryButton>Create Candidate</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>RollNo</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.map((candidate, k) => {
                                        return (
                                            <tr key={k}>
                                                <td>{candidate.name}</td>
                                                <td>{candidate.roll_no}</td>
                                                <td>{candidate.email}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ListCandidates;
