import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-muted-foreground mb-8">
            These Terms of Service ("Terms") govern your access to and use of MentorNet's website, services, and applications (collectively, the "Services"). Please read these Terms carefully before using our Services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. These Terms constitute a legally binding agreement between you and MentorNet regarding your use of the Services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet all eligibility requirements.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration and Security</h2>
          <p>
            To access certain features of our Services, you may need to register for an account. When you register, you agree to provide accurate, current, and complete information. You are responsible for maintaining the security of your account, and you accept all risks of unauthorized access to your account data.
          </p>
          <p className="mt-4">
            You are solely responsible for all activity that occurs under your account. You agree to notify MentorNet immediately of any unauthorized use of your account or any other breach of security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Blockchain-Based Services</h2>
          <p>
            Some of our Services involve blockchain technology, non-fungible tokens (NFTs), and digital wallets. By using these Services, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>You understand the inherent risks associated with blockchain technology, cryptocurrency, and digital assets</li>
            <li>You are solely responsible for maintaining the security of your private keys and wallet</li>
            <li>Blockchain transactions are irreversible once confirmed</li>
            <li>The value of digital assets can be volatile and may change significantly over time</li>
            <li>You agree to comply with all applicable laws and regulations regarding blockchain technologies and digital assets in your jurisdiction</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. AI-Powered Services</h2>
          <p>
            Our Services utilize artificial intelligence technologies to provide mentorship, guidance, and other features. By using these Services, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>AI-generated content and guidance may not always be accurate or appropriate for your specific situation</li>
            <li>You should use your own judgment when acting on advice or information provided by our AI systems</li>
            <li>Your interactions with our AI systems may be recorded and used to improve our Services</li>
            <li>We may use anonymized data from your interactions to train and enhance our AI systems</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. User Conduct</h2>
          <p>
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Violating any laws, regulations, or third-party rights</li>
            <li>Using the Services to distribute malware, viruses, or other harmful code</li>
            <li>Interfering with the proper functioning of the Services</li>
            <li>Attempting to access areas of the Services you are not authorized to access</li>
            <li>Harassing, threatening, or intimidating other users</li>
            <li>Posting or sharing inappropriate, offensive, or illegal content</li>
            <li>Impersonating another person or entity</li>
            <li>Using the Services for any illegal activity</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property Rights</h2>
          <p>
            The Services and all content, features, and functionality thereof, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, software, and the compilation thereof, are owned by MentorNet, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Digital Certificates and NFTs</h2>
          <p>
            Our platform may issue digital certificates and Soulbound NFTs to represent your skills, achievements, and credentials. With respect to these digital assets:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>MentorNet retains the right to issue, revoke, or modify digital certificates and NFTs at its discretion</li>
            <li>Soulbound NFTs issued on our platform are non-transferable by design</li>
            <li>Digital certificates and NFTs do not constitute official academic credentials unless explicitly stated</li>
            <li>You grant us permission to publicly display your achievements and credentials within our platform</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, MentorNet shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Modifications to the Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Services after the effective date of the revised Terms constitutes your acceptance of the changes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:legal@mentornet.io" className="text-mentor hover:underline">legal@mentornet.io</a>.
          </p>
          
          <div className="border-t border-slate-200 mt-12 pt-8">
            <p className="text-sm text-muted-foreground">
              Last Updated: June 15, 2023
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              By using MentorNet, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="text-mentor hover:underline">
                Contact Us
              </Link>
              <span className="mx-2">•</span>
              <Link href="/privacy" className="text-mentor hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 