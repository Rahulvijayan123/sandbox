"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TabType = "scientific" | "commercial" | "clinical" | "bd-agent"

export default function BiotechPlayground() {
  const [activeTab, setActiveTab] = useState<TabType>("scientific")

  const tabs = [
    { id: "scientific" as TabType, label: "Scientific" },
    { id: "commercial" as TabType, label: "Commercial" },
    { id: "clinical" as TabType, label: "Clinical" },
    { id: "bd-agent" as TabType, label: "BD Agent" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later
    console.log(`${activeTab} form submitted`)
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
            placeholder="e.g., HER2"
            className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ip-status" className="text-white">
            IP Status
          </Label>
          <Input
            id="ip-status"
            placeholder="e.g., 10 years protection left"
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
          placeholder="e.g., Preclinical, IND-ready, Phase 1"
          className="bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="smiles-bd" className="text-white">
          SMILES String
        </Label>
        <Input
          id="smiles-bd"
          placeholder="Enter SMILES string..."
          className="font-mono bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fasta-bd" className="text-white">
          FASTA Sequence
        </Label>
        <Textarea
          id="fasta-bd"
          placeholder="Enter FASTA sequence..."
          className="min-h-[80px] font-mono text-sm bg-[#002A1A] border-[#00C277]/30 text-white placeholder:text-white/50 focus:border-[#00C277] focus:ring-[#00C277]/30"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#00C277] hover:bg-[#008C5B] text-white border-0 shadow-lg shadow-[#00C277]/20"
      >
        Submit BD Analysis
      </Button>
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
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2">Convexia Sandbox</h1>
        </div>

        {/* Top Disclaimer */}
        <div className="text-center mb-4">
          <p className="text-xs text-white/70 max-w-3xl mx-auto">
            This is a very limited demo showcasing only a small subset of Convexia's capabilities. Outputs are simplified and not representative of the full platform. Please reach out to schedule a full demo below.
          </p>
        </div>

        {/* Demo Button */}
        <div className="text-center mb-8">
          <a
            href="https://calendly.com/ayaan-convexia/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="bg-gradient-to-r from-[#00C277] to-[#008C5B] hover:from-[#008C5B] hover:to-[#00C277] text-white px-8 py-3 text-base font-semibold rounded-full shadow-xl shadow-[#00C277]/30 hover:shadow-2xl hover:shadow-[#00C277]/40 transition-all duration-300 transform hover:scale-105 border border-[#00C277]/50 hover:border-[#00C277]">
              Schedule Full Demo
            </Button>
          </a>
        </div>

        {/* Main Window */}
        <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0 bg-[#00160E]/90 backdrop-blur-md border-white/10">
          <CardHeader className="pb-6 border-b border-white/10">
            <CardTitle className="text-xl font-semibold text-center text-white">{getTabTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">{renderActiveForm()}</CardContent>
        </Card>

        {/* Tab Strip */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2 bg-[#002A1A] backdrop-blur-lg p-2 rounded-full border border-[#00C277]/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#00C277] text-white shadow-lg shadow-[#00C277]/20"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 text-center px-4">
          <p className="text-xs text-white/60 max-w-3xl mx-auto leading-relaxed">
            Outputs shown here are minimal and do not reflect the depth, accuracy, or breadth available to paying
            customers. Input data entered here is not stored or used for model training.
          </p>
        </div>
      </div>
    </div>
  )
}
