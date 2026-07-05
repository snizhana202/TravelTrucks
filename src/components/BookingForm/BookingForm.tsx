"use client";

import styles from "./BookingForm.module.css";
import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { sendBookingRequest } from "@/services/api";
import { BookingFormProps } from "@/types/camper";
import { iconMap } from "@/constants/icons";
import { createPortal } from "react-dom";

export const BookingForm = ({ camperId }: BookingFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const validateName = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") return "Name is required";
    const regex = /^[A-Za-z]+\s[A-Za-z]+$/;
    if (!regex.test(trimmedValue)) {
      if (/[^A-Za-z\s]/.test(trimmedValue)) {
        return "Only English letters are allowed.";
      }
      return "Please enter your full name.";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (value.trim() === "") return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    setName(formattedValue);
    setNameError(validateName(formattedValue));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const nErr = validateName(name);
    const eErr = validateEmail(email);

    if (nErr || eErr) {
      setNameError(nErr);
      setEmailError(eErr);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendBookingRequest(camperId, { name, email });
      setMessage(result.message || "Successfully booked!");
      setName("");
      setEmail("");
      setNameError("");
      setEmailError("");
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const AlertIcon = iconMap.alert;
  const CheckIcon = iconMap.check;

  return (
    <div className={styles.formWrapper}>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>Book your campervan now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.inputs}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Name*"
              className={`${styles.input} ${nameError ? styles.inputError : ""}`}
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <AlertIcon className={styles.errorIcon} />}
            {nameError && (
              <span className={styles.errorMessage}>{nameError}</span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Email*"
              className={`${styles.input} ${emailError ? styles.inputError : ""}`}
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <AlertIcon className={styles.errorIcon} />}
            {emailError && (
              <span className={styles.errorMessage}>{emailError}</span>
            )}
          </div>
        </div>
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
      {message &&
        typeof window !== "undefined" &&
        createPortal(
          <div className={styles.toastMessage}>
            <CheckIcon className={styles.checkIcon} />
            {message}
          </div>,
          document.getElementById("portal-root")!,
        )}
    </div>
  );
};
