// src/app/page.tsx
"use client";
import { useState, useEffect, useRef } from 'react';

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CommentList } from './comment-list';

export interface Comment {
  id: number;
  text: string;
  isToxic: boolean;
  processed: boolean;
  avatarUrl: string; // Add avatar URL property
  commenter: string; // Add commenter name property
  datetime: string; // Add datetime property
}

export default function Home() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>('');
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker('/worker.js');
    workerRef.current.onmessage = (e: MessageEvent) => {
      const { id, isToxic } = e.data;
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, isToxic, processed: true } : comment
        )
      );
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment: Comment = {
      id: Date.now(),
      text: input,
      isToxic: false,
      processed: false,
      avatarUrl: 'https://via.placeholder.com/50', // Example avatar URL
      commenter: 'Anonymous', // Example commenter name
      datetime: new Date().toLocaleString(), // Example datetime
    };

    setComments((prevComments) => [newComment, ...prevComments]);

    workerRef.current?.postMessage(newComment);
    setInput('');
  };

  return (
    <div className="container p-4 max-w-[800px]">
      <h4 className="font-italic mb-4">This web is demonstrate using web worker to process the input text if it is toxic or not</h4>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="shadcn-input" // Use shadcn class for input styling
          placeholder="Add a comment..."
        />
        <Button
          type="submit"
          className="shadcn-button mt-5" // Use shadcn class for button styling
        >
          Add Comment
        </Button>
      </form>
      <CommentList items={comments} />
    </div>
  );
}
