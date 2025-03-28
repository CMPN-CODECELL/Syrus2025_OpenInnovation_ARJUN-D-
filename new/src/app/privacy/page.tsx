import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-muted-foreground mb-8">
            MentorNet ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, and applications (collectively, the "Services").
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our Services, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Personal Information:</strong> This includes information that can be used to identify you, such as your name, email address, postal address, phone number, and professional information.
            </li>
            <li>
              <strong>Account Information:</strong> Information related to your account, including your username, password, account preferences, and profile details.
            </li>
            <li>
              <strong>Blockchain Information:</strong> Public wallet addresses, transaction history, and digital asset ownership associated with the Services.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about your interaction with our Services, including your browsing history, search queries, features used, and time spent on the platform.
            </li>
            <li>
              <strong>Device Information:</strong> Information about the devices you use to access our Services, including IP address, browser type, operating system, and device identifiers.
            </li>
            <li>
              <strong>AI Interaction Data:</strong> Information collected during your interactions with our AI mentors and learning systems.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Collect Information</h2>
          <p>
            We collect information in various ways, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Direct Collection:</strong> Information you provide when you register, complete forms, update your profile, interact with other users, or communicate with us.
            </li>
            <li>
              <strong>Automated Collection:</strong> Information collected automatically through cookies, web beacons, and similar technologies when you use our Services.
            </li>
            <li>
              <strong>Third-Party Sources:</strong> Information we may receive from business partners, analytics providers, and blockchain networks.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Providing, maintaining, and improving our Services</li>
            <li>Personalizing your experience and delivering tailored content</li>
            <li>Providing AI-based mentorship and learning recommendations</li>
            <li>Processing transactions and managing digital assets</li>
            <li>Communicating with you about updates, services, and promotional offers</li>
            <li>Monitoring and analyzing usage patterns and trends</li>
            <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
            <li>Developing new products, services, and features</li>
            <li>Complying with legal obligations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. AI Data Processing</h2>
          <p>
            Our Services incorporate artificial intelligence technologies. When you interact with our AI systems:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>We may record and store your interactions to improve the quality of responses</li>
            <li>We may use anonymized conversation data to train and refine our AI models</li>
            <li>Your interactions may be reviewed by our AI trainers to improve system performance</li>
            <li>We implement safeguards to protect sensitive information shared with our AI systems</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Blockchain and Digital Asset Data</h2>
          <p>
            Due to the nature of blockchain technology:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Public blockchain data, including wallet addresses and transactions, is publicly visible by design</li>
            <li>Digital certificates and NFTs issued through our platform may contain public information about your skills and achievements</li>
            <li>We cannot alter or delete information once it is recorded on a blockchain</li>
            <li>We take measures to ensure that sensitive personal information is not stored directly on-chain</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclosure of Your Information</h2>
          <p>
            We may disclose your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf.
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>Compliance with Laws:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.
            </li>
            <li>
              <strong>Protection of Rights:</strong> We may disclose information to protect our rights, privacy, safety, or property, and that of our users or others.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share information with third parties when you have given us your consent to do so.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>The right to access the personal information we hold about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to or restrict the processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time, where processing is based on consent</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at <a href="mailto:privacy@mentornet.io" className="text-mentor hover:underline">privacy@mentornet.io</a>.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Children's Privacy</h2>
          <p>
            Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-4">
            <p>MentorNet</p>
            <p>123 Innovation Street</p>
            <p>San Francisco, CA 94103</p>
            <p>United States</p>
            <p><a href="mailto:privacy@mentornet.io" className="text-mentor hover:underline">privacy@mentornet.io</a></p>
          </div>
          
          <div className="border-t border-slate-200 mt-12 pt-8">
            <p className="text-sm text-muted-foreground">
              Last Updated: June 15, 2023
            </p>
            <div className="mt-8">
              <Link href="/contact" className="text-mentor hover:underline">
                Contact Us
              </Link>
              <span className="mx-2">•</span>
              <Link href="/terms" className="text-mentor hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 