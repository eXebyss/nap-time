'use client';

import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useState } from 'react';

type InputFormProps = {
    placeholder: string;
    buttonHandler: (value: string) => void;
};

const InputForm = ({ placeholder, buttonHandler }: InputFormProps) => {
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex">
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                classes="input input-ghost w-full max-w-xs my-2 lg:my-4 text-center focus:text-start lg:text-start lg:pl-0 lg:focus:pl-4"
            />
            {value && (
                <Button
                    type="button"
                    onClick={() => buttonHandler(value)}
                    classes="btn-ghost ml-2"
                >
                    Submit
                </Button>
            )}
        </div>
    );
};

export default InputForm;
