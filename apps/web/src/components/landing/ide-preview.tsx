"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function IDEPreview() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#030303]">
      <Container className="mx-auto w-full max-w-[1200px] px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[1000px] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)] border border-white/[0.08]"
        >
          <Image
            src="/ide-preview.png"
            alt="CodeSync IDE Interface"
            width={1000}
            height={600}
            priority
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </Container>
    </section>
  );
}
