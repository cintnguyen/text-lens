require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
// const openai = require('openai')
// console.log("OPEN", openai)
const text = 
    'IReplace text |Comments\n' +
    'Search\n' +
    'MassHealth\n' +
    'MassHealth\n' +
    'Adult Disability Supplement\n' +
    'HEALTH\n' +
    'CONNECTOR\n' +
    'Comocowealth of Massachust\n' +
    '"instructions for Completing the Supplement\n' +
    'You have indicated on your MassHealth application that you have a disability, Disability standards require that the disability\n' +
    'has lasted or is expected to last at least 12 months. IMass Disability Evaluation Services (DES) will review your disability\n' +
    'application for MassHealth. It is very important that you complete this Disability Supplement.\n' +
    'To get MassHealth based on your disability, you need to tell us about\n' +
    'your medical and mental health providers. These may include doctors, psychologists, therapists, social workers, physical\n' +
    'therapists, chiropractors, hospitals, health centers, and clinics from whom you receive or have received treatment; and\n' +
    'yourself: your work history for the past 15 years, your educational background, and your daily activities.\n' +
    'Completing the Disability Supplement will give us this information and will help us make a quick decision.\n' +
    'Please read the following instructions before beginning\n' +
    '. Print, or write clearly and complete the supplement to the best of your ability\n' +
    '. Sien and date an Authorization to Release Protected Health Information Form for each medical and mental health provider\n' +
    'you list on the supplement.\n' +
    'After you have filled out the supplement, submit it to\n' +
    'Disability Evaluation Services / UMASS Medical DES\n' +
    'P.O. Box 2796\n' +
    'Worcester, MA 01613-2796\n' +
    'DES will ask for your medical and treatment records from the providers you have listed. If you have any of your medical\n' +
    'records, please send a copy with this form. If more information or tests are needed, a member of DES will get in touch with you\n' +
    'Your eligibility will be determined more quickly if all items on the supplement are filled i\n' +
    'This is not an application for medical benefits. If you have not already completed a MassHealth application, you must fill one\n' +
    'out in zidition to this form. If you have any questions about how to apply, please call (800) 811-2900 (TTY (800) 497-4648\n' +
    'for people who are deal, hard of hearing, or speech disabled)\n' +
    'If you need help with this form, you can call the UMass Disability Evaluation Services (DES) Help Line at (888) 497-9890\n' +
    'Fill in every section of this form. If you do not fill in every section, we may not be able to decide if you are disabled\n' +
    'Information about you\n' +
    'Male\n' +
    'Female\n' +
    'Last name First name Middle initial\n' +
    'Social security number\n' +
    'Street address\n' +
    'Apt. #\n' +
    'City\n' +
    'Zip code\n' +
    'Date of birth (mm/dd/yyy\n' +
    'Home phon\n' +
    'Work/other phone\n' +
    'We may need to schedule ailestort\n' +
    'sonpiment?\n' +
    'Plea\n' +
    'check all\n' +
    'Any time is ok\n' +
    '/16 %\n' +
    '75% +\n' +
    '@ Fit\n' +
    'Friday a.m.\n' +
    'Monday p.M\n' +
    'echesday p.m. Thursday p. m. Friday p.m.\n' +
    'Did you apply for Social Security'



const configuration = new Configuration({
    organization: "org-vMpv1b4Blv47JzS7bQJlSnf5",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
console.log(process.env.OPENAI_API_KEY)
// const configuration = new Configuration({
//     organization: "org-vMpv1b4Blv47JzS7bQJlSnf5",
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi({api_key: process.env.OPENAI_API_KEY});

async function summarize(textToSummarize) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize this ${textToSummarize}` }],
    });
    let response = completion.data.choices[0].message
    console.log(response.content)
    const items = response.content.split(/\d+\. /);
    items.shift(); // Remove empty first item
    const modifiedItems = items.map(item => item.replace(/\n/g, ''));
    return modifiedItems
}

summarize(text)