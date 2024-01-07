import AddQuestionDrawer from "@/Components/AddQuestionDrawer";
import PrimaryButton from "@/Components/PrimaryButton";
import Question from "@/Components/Question";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Exam, PageProps, Question as Q } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import moment from "moment";
import { FormEvent, useRef, useState } from "react";

type ExamProps = PageProps & {
    exam: Exam;
};

const ShowExam = ({ auth, exam }: ExamProps) => {
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {exam.title}
                        </h2>
                        <p className="text-sm text-slate-400">
                            {exam.starts_at} - {exam.ends_at}
                        </p>
                    </div>
                    <Link href={route("exams.edit", exam.id)}>
                        <PrimaryButton>Edit</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="List of Exams" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-xl">Instructions</h3>
                            <p
                                className="prose"
                                dangerouslySetInnerHTML={{
                                    __html: exam.instructions,
                                }}
                            ></p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-xl">
                                    Question Bank
                                </h3>
                                <AddQuestionDrawer exam={exam} />
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        {exam.questions.map((question, k) => {
                            return (
                                <div className="mt-2" key={k}>
                                    <p className="font-bold">
                                        {" "}
                                        {k + 1}.) {question.question}
                                    </p>
                                    <ul className="pl-4 mt-2">
                                        {question.options.map((option, o) => {
                                            return (
                                                <li key={o}>
                                                    {o + 1}.) {option}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <p className="mt-3">
                                        Answer: {question.answer}
                                    </p>
                                    <hr className="mt-6 border border-slate-300" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default ShowExam;
