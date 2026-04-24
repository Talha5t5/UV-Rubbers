"use client";

import { FormEvent, useState } from "react";
import { Send, User, Mail, Phone, Building2, Globe, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    website: "",
    message: "",
  });

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone Number: ${form.phone}`,
      `Business Name: ${form.business}`,
      `Website: ${form.website}`,
      "",
      "Message:",
      form.message,
    ]
      .join("\n")
      .trim();

    window.location.href = `mailto:info@uvrubbers.com.au?subject=${encodeURIComponent("UV Rubbers enquiry")}&body=${encodeURIComponent(body)}`;

    toast({
      title: "Enquiry Prepared",
      description: "Your email client has been opened with the completed trade enquiry.",
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-4">Full Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
            <Input
              className="rounded-full pl-12 bg-white border-border h-14 text-xs font-bold uppercase tracking-widest focus-visible:ring-brand"
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="John Doe"
              required
              value={form.name}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-4">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
            <Input
              className="rounded-full pl-12 bg-white border-border h-14 text-xs font-bold uppercase tracking-widest focus-visible:ring-brand"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="john@example.com"
              required
              type="email"
              value={form.email}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-4">Phone Number</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
            <Input
              className="rounded-full pl-12 bg-white border-border h-14 text-xs font-bold uppercase tracking-widest focus-visible:ring-brand"
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="0400 000 000"
              value={form.phone}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-4">Business Name</label>
          <div className="relative group">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
            <Input
              className="rounded-full pl-12 bg-white border-border h-14 text-xs font-bold uppercase tracking-widest focus-visible:ring-brand"
              onChange={(event) => updateField("business", event.target.value)}
              placeholder="Company Pty Ltd"
              value={form.business}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-4">Message / Enquiry Details</label>
        <div className="relative group">
          <MessageSquare className="absolute left-5 top-5 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
          <Textarea
            className="min-h-40 rounded-3xl pl-12 pt-4 bg-white border-border text-xs font-bold uppercase tracking-widest focus-visible:ring-brand resize-none"
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="How can we help you today?"
            required
            value={form.message}
          />
        </div>
      </div>

      <Button size="xl" type="submit" className="w-full rounded-full bg-brand hover:bg-brand-dark text-white font-black uppercase tracking-[0.2em] h-16 shadow-brand transition-all hover:scale-[1.02] active:scale-[0.98]">
        <Send className="w-5 h-5 mr-3" />
        Submit Enquiry
      </Button>
    </form>
  );
};

export default ContactForm;