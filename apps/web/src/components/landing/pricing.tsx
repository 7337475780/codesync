"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { CheckCircle2, Minus, Sparkles, Building2, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    desc: "Perfect for individuals and small side projects.",
    icon: <Users size={18} className="text-gray-400" />,
    features: [
      "3 Projects",
      "AI Limited",
      "Community Support",
      "1 GB Storage",
      "Public Projects"
    ],
    cta: "Get Started",
    highlight: false
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    desc: "For professional developers and growing apps.",
    icon: <Zap size={18} className="text-[#a855f7]" />,
    features: [
      "Unlimited Projects",
      "Unlimited AI",
      "Private Projects",
      "Custom Domains",
      "Deployments",
      "GitHub Sync",
      "Priority Support",
      "50 GB Storage"
    ],
    cta: "Upgrade to Pro",
    highlight: true,
    badge: "Popular"
  },
  {
    name: "Teams",
    price: "₹2,499",
    period: "/month",
    desc: "For engineering teams collaborating in real-time.",
    icon: <Users size={18} className="text-blue-400" />,
    features: [
      "Everything in Pro plus",
      "Shared Workspaces",
      "Roles",
      "Permissions",
      "Live Collaboration",
      "Shared AI",
      "100 GB Storage"
    ],
    cta: "Start Team Trial",
    highlight: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Pricing",
    desc: "For large organizations with strict security needs.",
    icon: <Building2 size={18} className="text-emerald-400" />,
    features: [
      "Everything included",
      "SSO",
      "Audit Logs",
      "Dedicated Support",
      "Unlimited Storage",
      "Custom Deployment",
      "Security Controls"
    ],
    cta: "Contact Sales",
    highlight: false
  }
];

const compareFeatures = [
  { name: "Projects", free: "3", pro: "Unlimited", teams: "Unlimited", enterprise: "Unlimited" },
  { name: "Storage", free: "1 GB", pro: "50 GB", teams: "100 GB", enterprise: "Unlimited" },
  { name: "AI Requests", free: "Limited", pro: "Unlimited", teams: "Shared Pool", enterprise: "Custom Limits" },
  { name: "Collaboration", free: false, pro: false, teams: true, enterprise: true },
  { name: "Deployments", free: "Standard", pro: "Fast", teams: "Turbo", enterprise: "Custom Infra" },
  { name: "Domains", free: "codesync.dev", pro: "Custom", teams: "Custom", enterprise: "Custom" },
  { name: "Team Members", free: "1", pro: "1", teams: "Up to 10", enterprise: "Unlimited" },
  { name: "GitHub", free: "Public Only", pro: "Private Repos", teams: "Private Repos", enterprise: "Enterprise Server" },
  { name: "Priority Support", free: false, pro: true, teams: true, enterprise: "Dedicated SLA" },
  { name: "SSO", free: false, pro: false, teams: false, enterprise: true }
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-white/[0.02]">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#8b5cf6]/10 blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4f46e5]/10 blur-[150px] mix-blend-screen"></div>

      </div>

      <Container className="mx-auto w-full max-w-[1200px] px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-[13px] font-medium tracking-wide mb-6"
          >
            <Sparkles size={14} className="text-[#a78bfa]" /> Simple Pricing
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[40px] md:text-[56px] font-bold text-white mb-4 tracking-tight leading-tight"
          >
            Plans for every developer.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[17px] text-gray-400 font-medium max-w-[500px] mb-10"
          >
            Start free. Upgrade when your team grows.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center bg-[#0a0a0a] border border-white/10 p-1 rounded-full relative"
          >
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-6 py-2 rounded-full text-[14px] font-semibold transition-all duration-300 ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
            >
              {billingCycle === 'monthly' && (
                <motion.div layoutId="activeBilling" className="absolute inset-0 bg-[#1a1a1a] rounded-full border border-white/5 shadow-md z-0" />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button 
              onClick={() => setBillingCycle('annually')}
              className={`relative px-6 py-2 rounded-full text-[14px] font-semibold transition-all duration-300 ${billingCycle === 'annually' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
            >
              {billingCycle === 'annually' && (
                <motion.div layoutId="activeBilling" className="absolute inset-0 bg-[#1a1a1a] rounded-full border border-white/5 shadow-md z-0" />
              )}
              <span className="relative z-10">Annually <span className="text-[#a78bfa] ml-1">-20%</span></span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative h-full flex ${plan.highlight ? 'lg:-mt-4 lg:mb-4 z-10' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -inset-[1px] bg-gradient-to-b from-[#8b5cf6] via-[#3b82f6] to-transparent rounded-2xl opacity-50 blur-[2px] pointer-events-none"></div>
              )}
              
              <Card className={`relative w-full p-8 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                plan.highlight 
                ? 'bg-[#0f0f15] border-[#8b5cf6]/30 shadow-[0_0_40px_rgba(139,92,246,0.15)] rounded-2xl' 
                : 'bg-[#0a0a0a]/50 backdrop-blur-md border-white/[0.05] hover:border-white/[0.1] hover:bg-[#0f0f0f] rounded-2xl'
              }`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 ${plan.highlight ? 'bg-[#8b5cf6]/20 border-[#8b5cf6]/40' : ''}`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-[18px] font-bold text-white">{plan.name}</h3>
                </div>
                
                <div className="mb-3">
                  <span className="text-[32px] font-extrabold text-white tracking-tight">
                    {billingCycle === 'annually' && plan.price !== 'Custom' 
                      ? `₹${(Math.floor(parseInt(plan.price.replace('₹','').replace(/,/g,'')) * 12 * 0.8)).toLocaleString('en-IN')}` 
                      : plan.price}
                  </span>
                  {plan.price !== 'Custom' && <span className="text-[14px] text-gray-500 font-medium ml-1">{billingCycle === 'annually' ? '/year' : '/month'}</span>}
                </div>
                
                <p className="text-[13px] text-gray-400 mb-8 min-h-[40px] leading-relaxed">
                  {plan.desc}
                </p>
                
                <Button className={`w-full h-11 rounded-lg text-[14px] font-semibold mb-8 transition-all duration-300 ${
                  plan.highlight 
                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white border-0 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}>
                  {plan.cta}
                </Button>
                
                <div className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-[#a78bfa]' : 'text-gray-500'}`} />
                      <span className="text-[13px] text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hidden md:block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md shadow-2xl"
        >
          <div className="p-8 border-b border-white/5 text-center">
            <h3 className="text-[24px] font-bold text-white mb-2">Compare Features</h3>
            <p className="text-[14px] text-gray-400">Deep dive into what's included in every tier.</p>
          </div>
          
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-[13px] font-bold text-white border-b border-white/5 bg-white/[0.02] w-1/4">Features</th>
                  <th className="py-4 px-6 text-[13px] font-bold text-gray-300 border-b border-white/5 bg-white/[0.02] text-center w-[15%]">Free</th>
                  <th className="py-4 px-6 text-[13px] font-bold text-[#a78bfa] border-b border-white/5 bg-[#8b5cf6]/5 text-center w-[15%]">Pro</th>
                  <th className="py-4 px-6 text-[13px] font-bold text-blue-300 border-b border-white/5 bg-blue-500/5 text-center w-[15%]">Teams</th>
                  <th className="py-4 px-6 text-[13px] font-bold text-emerald-300 border-b border-white/5 bg-emerald-500/5 text-center w-[15%]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {compareFeatures.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 text-[13px] font-medium text-gray-300">{row.name}</td>
                    
                    {[row.free, row.pro, row.teams, row.enterprise].map((val, idx) => (
                      <td key={idx} className={`py-4 px-6 text-center ${idx === 1 ? 'bg-[#8b5cf6]/[0.02]' : ''}`}>
                        {typeof val === 'boolean' ? (
                          val 
                          ? <CheckCircle2 size={16} className={`mx-auto ${idx === 1 ? 'text-[#a78bfa]' : 'text-gray-400'}`} /> 
                          : <Minus size={16} className="mx-auto text-gray-700" />
                        ) : (
                          <span className={`text-[13px] ${idx === 1 ? 'text-[#a78bfa] font-medium' : 'text-gray-400'}`}>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Mobile accordion fallback placeholder for comparison */}
        <div className="md:hidden mt-12 text-center text-[13px] text-gray-500 border border-white/10 rounded-xl p-6 bg-white/[0.02]">
          Swipe left/right on cards above to see features. View on desktop for full feature comparison table.
        </div>

      </Container>
    </section>
  );
}
