"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";
import { PhoneCall } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_FORM_ID = "xoeayjbd";

export default function ContactPage() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className="flex min-h-screen flex-col bg-[#edf5f5]">
        <FloatingNavWrapper initialBg="bg-[#edf5f5]">
          <Navbar />
        </FloatingNavWrapper>

        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-6 py-20">
          <div className="w-full max-w-xl rounded-lg border bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#09283b]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#09283b]">Message Sent!</h2>
            <p className="mt-3 text-sm text-gray-600">
              Thanks for reaching out. We&apos;ve received your message and will get back to you shortly.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#09283b] px-6 text-sm font-medium text-white transition-colors hover:bg-[#0d3558]"
            >
              Send another message
            </a>
          </div>
        </main>

        <DotSeparator />
        <div className="mt-auto px-6 pb-12">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#edf5f5]">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>

      <main className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="mx-auto grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <section>
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500">Let&apos;s Talk</p>
              <h2 className="mt-2 text-3xl font-bold text-[#09283b]">Get In Touch With US</h2>
              <p className="mt-4 text-sm text-[#12303f] max-w-xl">
                We&apos;re here to answer your questions, guide you through admissions, and support your child&apos;s
                educational journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-xl" noValidate>
              <div>
                <label className="sr-only">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  disabled={state.submitting}
                  className="w-full rounded-md bg-white/60 px-4 py-3 text-sm placeholder-gray-400 shadow-sm disabled:opacity-60"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="mt-1 block text-xs text-red-600"
                />
              </div>

              <div>
                <label className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  required
                  disabled={state.submitting}
                  className="w-full rounded-md bg-white/60 px-4 py-3 text-sm placeholder-gray-400 shadow-sm disabled:opacity-60"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="mt-1 block text-xs text-red-600"
                />
              </div>

              <div>
                <label className="sr-only">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  disabled={state.submitting}
                  className="w-full rounded-md bg-white/60 px-4 py-3 text-sm placeholder-gray-400 shadow-sm disabled:opacity-60"
                />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                  className="mt-1 block text-xs text-red-600"
                />
              </div>

              <div>
                <label className="sr-only">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us what you need"
                  rows={4}
                  required
                  disabled={state.submitting}
                  className="w-full rounded-md bg-white/60 px-4 py-3 text-sm placeholder-gray-400 shadow-sm disabled:opacity-60"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="mt-1 block text-xs text-red-600"
                />
              </div>

              {state.errors && (
                <p className="text-xs text-red-600">
                  Something went wrong while sending your message. Please try again.
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-48 rounded-md bg-[#09283b] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0d3558] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-gray-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#09283b]">Chat to support</h3>
                  <p className="mt-2 text-sm text-gray-600">We are here to help.</p>
                  <a href="mailto:support@foursquareschools.com" className="mt-3 block text-sm font-medium text-[#09283b]">
                    fissabk@yahoo.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-gray-100 p-3">
                  <PhoneCall />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#09283b]">Call Us</h3>
                  <p className="mt-2 text-sm text-gray-600">Mon-Fri 8am to 5pm.</p>
                  <a href="tel:+15550000000" className="mt-3 block text-sm font-medium text-[#09283b]">
                    ( 08079951366 )
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
<DotSeparator />
      <div className="mt-auto px-6 pb-12">
        <Footer />
      </div>
    </div>
  );
}
