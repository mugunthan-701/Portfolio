"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mail, Github, Linkedin, ExternalLink, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Replace this with your actual image URL
  const profileImageUrl = "/placeholder.svg?height=400&width=400"

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Determine which section is currently in view
      sectionRefs.forEach((ref, index) => {
        if (!ref.current) return

        const element = ref.current as HTMLElement
        const rect = element.getBoundingClientRect()

        // If the section is in view (allowing for some overlap)
        if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.3) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (sectionRefs[index].current) {
      ;(sectionRefs[index].current as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormSubmitted(true)
        toast({
          title: "Message received!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        })
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send your message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index ? "bg-sky-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Navigate to section ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={sectionRefs[0]}
        className={`min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 transition-opacity duration-500 ${
          activeSection === 0 ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image - Replace the URL with your actual image */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-sky-400 animate-fadeIn shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
            <Image
              src={profileImageUrl || "/placeholder.svg"}
              alt="Mugunthan's profile"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-800 animate-slideUp">
              Hello, I'm <span className="text-sky-500">Mugunthan</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slideUp animation-delay-200">
              Full-stack developer & aspiring entrepreneur
            </p>
            <div className="flex flex-wrap gap-4 animate-slideUp animation-delay-300">
              <Button
                className="group bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 transform hover:translate-y-[-2px]"
                onClick={() => scrollToSection(2)}
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 transition-all duration-300 transform hover:translate-y-[-2px]"
                onClick={() => scrollToSection(4)}
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={sectionRefs[1]}
        className={`min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-[#edf2f7] transition-opacity duration-500 ${
          activeSection === 1 ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 animate-slideUp">About Me</h2>
          <p className="text-lg text-gray-600 mb-6 animate-slideUp animation-delay-100">
            I'm a passionate full-stack developer with expertise in React, TypeScript, Prisma, and modern web
            technologies. My journey in tech is driven by a deep interest in AI, cybersecurity, and audio technology.
          </p>
          <p className="text-lg text-gray-600 mb-6 animate-slideUp animation-delay-200">
            Beyond coding, I enjoy building innovative software solutions that solve real-world problems. I've led
            multiple team projects and I'm always looking for new challenges.
          </p>
          <div className="flex gap-4 mt-8 animate-slideUp animation-delay-300">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 transition-all duration-300 transform hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:mugunthan701@gmail.com">
              <Button
                variant="outline"
                size="icon"
                className="border-sky-500 text-sky-500 hover:bg-sky-50 transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={sectionRefs[2]}
        className={`min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 transition-opacity duration-500 ${
          activeSection === 2 ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 animate-slideUp">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              title="Zylo"
              description="A drag-and-drop e-commerce site builder that simplifies online store creation."
              tags={["React", "TypeScript", "Prisma"]}
              index={0}
            />
            <ProjectCard
              title="Brain Assessment"
              description="An AI-powered tool for cognitive assessment and brain health monitoring."
              tags={["Next.js", "TensorFlow", "Python"]}
              index={1}
            />
            <ProjectCard
              title="Women & Child Safety App"
              description="A mobile application designed to enhance safety with emergency alerts and location tracking."
              tags={["React Native", "Firebase", "Google Maps API"]}
              index={2}
            />
            <ProjectCard
              title="Audio Processing Tool"
              description="An innovative tool for audio enhancement and processing using AI algorithms."
              tags={["Python", "TensorFlow", "Web Audio API"]}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={sectionRefs[3]}
        className={`min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-[#edf2f7] transition-opacity duration-500 ${
          activeSection === 3 ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 animate-slideUp">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-slideUp animation-delay-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Development</h3>
              <ul className="space-y-4">
                <SkillItem label="React & Next.js" level={90} />
                <SkillItem label="TypeScript" level={85} />
                <SkillItem label="Node.js" level={80} />
                <SkillItem label="Prisma ORM" level={75} />
              </ul>
            </div>
            <div className="animate-slideUp animation-delay-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Other Skills</h3>
              <ul className="space-y-4">
                <SkillItem label="UI/UX Design" level={70} />
                <SkillItem label="Cybersecurity" level={65} />
                <SkillItem label="AI & Machine Learning" level={60} />
                <SkillItem label="Audio Technology" level={75} />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={sectionRefs[4]}
        className={`min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 transition-opacity duration-500 ${
          activeSection === 4 ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 animate-slideUp">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-8 animate-slideUp animation-delay-100">
            Interested in collaborating or have a project in mind? Feel free to reach out!
          </p>

          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fadeIn">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Message Received!</h3>
              <p className="text-green-600 mb-4">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <Button
                onClick={() => setFormSubmitted(false)}
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 animate-slideUp animation-delay-200">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2 animate-slideUp animation-delay-300">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2 animate-slideUp animation-delay-400">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2 animate-slideUp animation-delay-500">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 transform hover:translate-y-[-2px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          )}

          {/* Alternative Contact Methods */}
          <div className="mt-12 pt-8 border-t border-gray-200 animate-slideUp animation-delay-500">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Or reach me directly at:</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href="mailto:mugunthan701@gmail.com"
                className="flex items-center gap-2 text-sky-500 hover:text-sky-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
                mugunthan701@gmail.com
              </a>
              <span className="hidden md:inline text-gray-400">|</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sky-500 hover:text-sky-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  tags,
  index,
}: { title: string; description: string; tags: string[]; index: number }) {
  return (
    <div
      className={`bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-slideUp group`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-sky-500 transition-colors">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-sky-50 text-sky-600 text-sm rounded-full transition-all duration-300 hover:bg-sky-100"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="group text-sky-500 hover:text-sky-600 hover:bg-sky-50">
        View Project <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  )
}

function SkillItem({ label, level }: { label: string; level: number }) {
  return (
    <li className="flex flex-col group">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-sky-500 h-2.5 rounded-full transition-all duration-1000 ease-out origin-left scale-x-0 group-hover:scale-x-100"
          style={{ width: `${level}%`, transform: "scaleX(1)" }}
        />
      </div>
    </li>
  )
}
