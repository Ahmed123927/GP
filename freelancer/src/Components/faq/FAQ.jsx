import React, { useState } from "react";
import Question from "../faq/Question";

const questions = [
    {
        id: 0,
        question: "What is Plus Exp?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: 1,
        question: "How can I help you?",
        answer: "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.",
    },
    {
        id: 2,
        question: "What type of services can I find in Plus Exp?",
        answer: "Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum.",
    },
    {
        id: 3,
        question: "What about achieving your task?",
        answer: "Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.",
    },
    {
        id: 4,
        question: "What type of services can you find?",
        answer: "Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.",
    },
    {
        id: 5,
        question: "Are the procedural fees refunded if the order is cancelled?",
        answer: "If the order amount is returned to your Khamsat balance, only the order value will be added without the procedural fees and you can purchase another service directly. When you request a refund to PayPal or credit card, we return the full amount you charged in addition to the fees."
    },
];

export default function FAQs() {
    const [items] = useState(questions);

    return (
        <section className="py-2 mx-auto text-center px-5 wqPage" id="ide">
            <article>
                <h2 className="fw-bold fw-bolder main-color">
                    Frequently Asked Questions
                </h2>
                
                <div className="text-center">
                    <p className="text-center">
                        Here are some of our FAQs. If you have any other questions you’d like answered, please feel free to email us.
                    </p>
                </div>
            </article>

            <article>
                <div>
                    {items.map(item => (
                        <Question key={item.id} {...item} />
                    ))}
                </div>

                <button className="btn btn-color px- py-2 rounded-3 text-white fw-bold">
                    More Info
                </button>
            </article>
        </section>
    );
}
