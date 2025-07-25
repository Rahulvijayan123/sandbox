"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

type TabType = "scientific" | "commercial" | "clinical" | "bd-agent"

export default function BiotechPlayground() {
  const [activeTab, setActiveTab] = useState<TabType>("bd-agent")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const tabs = [
    { id: "scientific" as TabType, label: "Scientific" },
    { id: "commercial" as TabType, label: "Commercial" },
    { id: "clinical" as TabType, label: "Clinical" },
    { id: "bd-agent" as TabType, label: "BD Agent" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (activeTab === "bd-agent") {
      setIsSubmitting(true)
      // Get form values
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const bdData = {
        therapeuticArea: formData.get("therapeutic-area-bd"),
        indication: formData.get("indication-bd"),
        target: formData.get("target-bd"),
        modality: formData.get("modality-bd"),
        assetStage: formData.get("asset-stage"),
      }
      console.log("[BD Agent] Saving to localStorage:", bdData)
      localStorage.setItem("bdAgentForm", JSON.stringify(bdData))
      // Show spinner for 3 minutes, then make API call and redirect
      setTimeout(async () => {
        try {
          console.log("[BD Agent] Sending API call to /api/perplexity", bdData)
          const res = await fetch("/api/perplexity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bdData),
          })
          console.log("[BD Agent] API response status:", res.status)
          if (res.ok) {
            const data = await res.json()
            console.log("[BD Agent] API response JSON:", data)
            localStorage.setItem("perplexityResult", JSON.stringify(data))
            router.push("/bd-dashboard")
          } else {
            const errorText = await res.text()
            console.error("[BD Agent] API error response:", errorText)
            setError("Failed to get response from Perplexity. " + errorText)
          }
        } catch (err) {
          console.error("[BD Agent] Fetch error:", err)
          setError("Network or server error. " + (err instanceof Error ? err.message : String(err)))
        } finally {
          setIsSubmitting(false)
        }
      }, 180000)
      return
    } else {
      // Form submission logic will be added later
      console.log(`${activeTab} form submitted`)
    }
  }

  const renderScientificForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fasta" className="text-white">
          FASTA Sequence
        </Label>
        <Textarea
          id="fasta"
          placeholder="Enter FASTA sequence..."
          className="min-h-[100px] font-mono text-sm bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="smiles" className="text-white">
          SMILES String
        </Label>
        <Input
          id="smiles"
          placeholder="Enter SMILES string..."
          className="font-mono bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="therapeutic-area" className="text-white">
            Therapeutic Area
          </Label>
          <Input
            id="therapeutic-area"
            placeholder="e.g., Oncology"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="indication" className="text-white">
            Indication
          </Label>
          <Input
            id="indication"
            placeholder="e.g., Breast Cancer"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="modality" className="text-white">
            Modality
          </Label>
          <Input
            id="modality"
            placeholder="e.g., Small Molecule"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-white">
            Company
          </Label>
          <Input
            id="company"
            placeholder="Company name"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mechanism" className="text-white">
            Mechanism of Action
          </Label>
          <Input
            id="mechanism"
            placeholder="e.g., PARP Inhibitor"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dev-stage" className="text-white">
            Development Stage
          </Label>
          <Input
            id="dev-stage"
            placeholder="e.g., Phase 2"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-[#00C277] hover:bg-[#008C5B] text-white border-0 shadow-lg shadow-[#00C277]/20"
      >
        Submit Scientific Analysis
      </Button>
    </form>
  )

  const renderCommercialForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="therapeutic-area-comm" className="text-white">
            Therapeutic Area
          </Label>
          <Input
            id="therapeutic-area-comm"
            placeholder="e.g., Oncology"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="indication-comm" className="text-white">
            Indication
          </Label>
          <Input
            id="indication-comm"
            placeholder="e.g., Breast Cancer"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target-comm" className="text-white">
            Target
          </Label>
          <Input
            id="target-comm"
            placeholder="e.g., HER2"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="geography" className="text-white">
            Geography
          </Label>
          <Input
            id="geography"
            placeholder="e.g., US, EU, Global"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="competitors" className="text-white">
          Competitor Drug Names <span className="text-white/50">(optional)</span>
        </Label>
        <Input
          id="competitors"
          placeholder="e.g., Drug A, Drug B, Drug C"
          className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#00C277] hover:bg-[#008C5B] text-white border-0 shadow-lg shadow-[#00C277]/20"
      >
        Submit Commercial Analysis
      </Button>
    </form>
  )

  const renderClinicalForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="therapeutic-area-clin" className="text-white">
            Therapeutic Area
          </Label>
          <Input
            id="therapeutic-area-clin"
            placeholder="e.g., Oncology"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="indication-clin" className="text-white">
            Indication
          </Label>
          <Input
            id="indication-clin"
            placeholder="e.g., Breast Cancer"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target-clin" className="text-white">
            Target
          </Label>
          <Input
            id="target-clin"
            placeholder="e.g., HER2"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cro-name" className="text-white">
            CRO Name
          </Label>
          <Input
            id="cro-name"
            placeholder="Contract Research Organization"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patient-population" className="text-white">
            Patient Population
          </Label>
          <Input
            id="patient-population"
            placeholder="e.g., Rare disease, Elderly"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-phase" className="text-white">
            Trial Phase
          </Label>
          <Input
            id="trial-phase"
            placeholder="e.g., Phase 1, Phase 3"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="trial-region" className="text-white">
          Country/Region for Trial
        </Label>
        <Input
          id="trial-region"
          placeholder="e.g., US, EU, Global"
          className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="smiles-clin" className="text-white">
          SMILES String
        </Label>
        <Input
          id="smiles-clin"
          placeholder="Enter SMILES string..."
          className="font-mono bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fasta-clin" className="text-white">
          FASTA Sequence
        </Label>
        <Textarea
          id="fasta-clin"
          placeholder="Enter FASTA sequence..."
          className="min-h-[80px] font-mono text-sm bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#00C277] hover:bg-[#008C5B] text-white border-0 shadow-lg shadow-[#00C277]/20"
      >
        Submit Clinical Analysis
      </Button>
    </form>
  )

  const renderBDAgentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="therapeutic-area-bd" className="text-white">
            Therapeutic Area
          </Label>
          <Input
            id="therapeutic-area-bd"
            name="therapeutic-area-bd"
            placeholder="e.g., Oncology"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="indication-bd" className="text-white">
            Indication
          </Label>
          <Input
            id="indication-bd"
            name="indication-bd"
            placeholder="e.g., Breast Cancer"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target-bd" className="text-white">
            Target
          </Label>
          <Input
            id="target-bd"
            name="target-bd"
            placeholder="e.g., HER2"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modality-bd" className="text-white">
            Modality
          </Label>
          <Input
            id="modality-bd"
            name="modality-bd"
            placeholder="e.g., Small Molecule, Antibody, Gene Therapy"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="asset-stage" className="text-white">
          Asset Stage
        </Label>
        <Input
          id="asset-stage"
          name="asset-stage"
          placeholder="e.g., Preclinical, IND-ready, Phase 1"
          className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#00C277] hover:bg-[#008C5B] text-white border-0 shadow-lg shadow-[#00C277]/20"
        disabled={isSubmitting}
      >
        Submit BD Analysis
      </Button>
      {isSubmitting && (
        <div className="flex flex-col items-center mt-4">
          <svg className="animate-spin h-6 w-6 text-[#00C277] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span className="text-xs text-white/80">This can take up to 30 minutes.</span>
        </div>
      )}
      {error && (
        <div className="mt-4 text-center text-sm text-red-400 bg-red-900/30 rounded p-2">
          {error}
        </div>
      )}
    </form>
  )

  const renderActiveForm = () => {
    switch (activeTab) {
      case "scientific":
        return renderScientificForm()
      case "commercial":
        return renderCommercialForm()
      case "clinical":
        return renderClinicalForm()
      case "bd-agent":
        return renderBDAgentForm()
      default:
        return renderScientificForm()
    }
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case "scientific":
        return "Scientific Analysis"
      case "commercial":
        return "Commercial Intelligence"
      case "clinical":
        return "Clinical Development"
      case "bd-agent":
        return "Business Development"
      default:
        return "Scientific Analysis"
    }
  }

  return (
    <div className="min-h-screen bg-[#00160E] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Only show BD Agent form with title */}
        <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0 bg-[#00160E]/90 backdrop-blur-md border-white/10">
          <CardHeader className="pb-6 border-b border-white/10">
            <CardTitle className="text-xl font-semibold text-center text-white">Business Development</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">{renderBDAgentForm()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
