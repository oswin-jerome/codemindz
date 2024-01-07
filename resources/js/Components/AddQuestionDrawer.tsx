import { useForm } from "@inertiajs/react";
import { FormEvent, useRef, useState } from "react";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { Exam } from "@/types";

type ExamProps = {
    exam: Exam;
};

const AddQuestionDrawer = ({ exam }: ExamProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<string[]>([]);

    const re = useRef<HTMLInputElement>(null);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    const { data, setData, put, processing, reset } = useForm<{
        options: string[];
        question: string;
        answer: string;
    }>({
        question: "",
        answer: "",
        options: [],
    });

    const handleAddQuestion = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
        put(route("exams.add_question", exam.id), {
            onFinish: () => {
                setIsOpen(false);
            },
            onSuccess: () => {
                // reset("answer");
                // reset("options");
                // reset("question");
                reset();
                alert(0);
            },
        });
    };

    return (
        <div>
            <PrimaryButton onClick={toggleDrawer}>Add</PrimaryButton>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="bla bla bla"
                size={400}
            >
                <div className="p-4">
                    <h3 className="text-xl font-bold">Add Question</h3>
                    <form
                        onSubmit={handleAddQuestion}
                        action=""
                        className="mt-4 grid gap-4"
                    >
                        <div className="input">
                            <label htmlFor="">Question</label>
                            <textarea
                                value={data.question}
                                onChange={(e) =>
                                    setData("question", e.target.value)
                                }
                                name="question"
                            ></textarea>
                        </div>
                        <div className="input">
                            <label htmlFor="Options">Options</label>
                            <ul>
                                {data.options.map((option, k) => {
                                    return <li key={k}>{option}</li>;
                                })}
                            </ul>
                        </div>

                        <div className="input">
                            <label htmlFor="">Option</label>
                            <input ref={re} type="text" name="" id="" />
                            <SecondaryButton
                                onClick={() => {
                                    setOptions([
                                        ...options,
                                        re.current?.value.toString() ?? "",
                                    ]);
                                    setData("options", [
                                        ...data.options,
                                        re.current?.value.toString() ?? "",
                                    ]);
                                }}
                            >
                                Add Options
                            </SecondaryButton>
                        </div>
                        <div className="input">
                            <label htmlFor="A">Answer</label>
                            <input
                                type="text"
                                value={data.answer}
                                onChange={(e) =>
                                    setData("answer", e.target.value)
                                }
                            />
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </Drawer>
        </div>
    );
};

export default AddQuestionDrawer;
