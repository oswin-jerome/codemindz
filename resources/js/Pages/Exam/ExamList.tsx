import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Exam, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import moment from "moment";
type ExamProps = PageProps & {
    exams: Exam[];
};

const ExamList = ({ auth, exams }: ExamProps) => {
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Exams
                    </h2>
                    <Link href={route("exams.create")}>
                        <PrimaryButton>Create New Exam</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="List of Exams" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="w-36">Title</th>
                                        <th>Starts At</th>
                                        <th>Ends At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams.map((exam, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className=" ">
                                                    <p className="w-36 truncate  whitespace-nowrap">
                                                        {exam.title}
                                                    </p>
                                                </td>
                                                <td>
                                                    {moment(
                                                        exam.starts_at
                                                    ).format("DD/MM/Y H:m:s")}
                                                </td>
                                                <td>
                                                    {moment(
                                                        exam.ends_at
                                                    ).format("DD/MM/Y H:m:s")}
                                                </td>
                                                <td>
                                                    <Link
                                                        href={route(
                                                            "exams.show",
                                                            exam.id
                                                        )}
                                                    >
                                                        <SecondaryButton>
                                                            View
                                                        </SecondaryButton>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default ExamList;
