"use client";

import { use, useState } from "react";
import { set, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { createIssueSchema } from "@/app/validationSchemas";
import Spinner from "@/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const CreateIssue = ({ onIssueCreated }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [labelSucess, setLabelSucess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div
      className="w-full group max-w-[700px]"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => {
        setMouseOver(false);
        setLabelSucess(false);
      }}
    >
      <form
        className="container_main w-40 min-w-fit h-24 group-hover:w-full group-hover:h-96 ease-in-out duration-100"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsLoading(true);
            await axios.post("/api/issues", data);
            onIssueCreated();
            setLabelSucess(true);
            setIsLoading(false);
            reset();
          } catch (err) {
            console.error(err);
          }
        })}
      >
        <div className="flex flex-row items-center">
          <button className="button_main" disabled={isLoading}>
            {mouseOver ? "Post Issue" : "Create Issue"}
          </button>
          {labelSucess && (
            <div className="flex flex-row items-center">
              <FaCheck className="ml-4 text-green-500" />
              <p className="ml-2 text-green-500">Issue has been created!</p>
            </div>
          )}
          {isLoading && <Spinner />}
          {(errors.title || errors.description) && (
            <div className="flex flex-row items-center">
              <IoClose className="ml-4 text-red-500" />
              <p className="ml-2 text-red-500">
                {`${errors.title ? errors.title?.message : ""} ${
                  errors.description ? errors.description?.message : ""
                }`}
              </p>
            </div>
          )}
        </div>
        {mouseOver && (
          <div className="flex flex-col space-y-3 w-full justify-between items-start mt-10">
            <p className="font-medium text-white ml-3">Title:</p>
            <input
              type="text"
              className="input_box"
              placeholder="Enter a title"
              {...register("title")}
            />
            <p className="font-medium text-white ml-3">Description:</p>
            <textarea
              className="input_box resize-none h-32"
              placeholder="Enter a description"
              {...register("description")}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateIssue;
