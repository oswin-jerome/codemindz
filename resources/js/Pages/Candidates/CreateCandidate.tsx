import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { FormEvent } from "react";

const CreateCandidate = ({ auth }: PageProps) => {
    const { data, setData, post, processing } = useForm({
        name: "",
        email: "",
        roll_no: "",
        password: "",
    });

    const handleForm = (e: FormEvent) => {
        e.preventDefault();
        post(route("candidates.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create Candidate
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={handleForm}
                                action=""
                                className="grid gap-4"
                            >
                                <div className="input">
                                    <label htmlFor="">Name</label>
                                    <input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        type="text"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="">RollNo</label>
                                    <input
                                        value={data.roll_no}
                                        onChange={(e) =>
                                            setData("roll_no", e.target.value)
                                        }
                                        type="text"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="">Email</label>
                                    <input
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        type="text"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="">Password</label>
                                    <input
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <PrimaryButton>Submit</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateCandidate;
