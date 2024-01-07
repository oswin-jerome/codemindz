import { useState } from "react";
import TextInput from "./TextInput";
import { Question as Q } from "@/types";

const Question = () => {
    const [question, setQuestion] = useState<Q>({
        options: [],
        question: "",
        type: "",
    });

    return (
        <div>
            <div className="p-4">
                <TextInput
                    value={question.question}
                    onChange={(e) =>
                        setQuestion({ ...question, question: e.target.value })
                    }
                />

                <TextInput
                    onBlur={(e) =>
                        setQuestion({
                            ...question,
                            options: [...question.options, e.target.value],
                        })
                    }
                />

                <ul className="list-disc">
                    {question.options.map((e) => {
                        return <li>{e}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Question;
