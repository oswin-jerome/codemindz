import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateExam = ({ auth }: PageProps) => {
    const { data, setData, errors, post, processing } = useForm({
        title: "",
        instructions: "",
        starts_at: "",
        ends_at: "",
    });
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        post(route("exams.store"));
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Exams
                    </h2>
                </div>
            }
        >
            <Head title="Create Exams" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={handleSubmit}
                                className="grid gap-4"
                            >
                                <div className="input">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        type="text"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="title">Instructions</label>
                                    <ReactQuill
                                        theme="snow"
                                        className="block mb-12"
                                        value={data.instructions}
                                        onChange={(e) =>
                                            setData("instructions", e)
                                        }
                                    />
                                    {/* <textarea
                                        onChange={(e) =>
                                            setData(
                                                "instructions",
                                                e.target.value
                                            )
                                        }
                                    ></textarea> */}
                                </div>
                                <div className="input">
                                    <label htmlFor="title">Starts At</label>
                                    <input
                                        type="datetime-local"
                                        onChange={(e) =>
                                            setData("starts_at", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="title">Ends At</label>
                                    <input
                                        onChange={(e) =>
                                            setData("ends_at", e.target.value)
                                        }
                                        type="datetime-local"
                                    />
                                </div>
                                <div className="mt-8">
                                    <PrimaryButton>Submit</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreateExam;
