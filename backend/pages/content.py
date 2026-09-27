"""
Content for every page of the site, served to the Next.js frontend via
/api/content/.

Everything here comes from The Oak Wellness practice profile, business card
and updated mission and vision. Only add information the practice has
supplied.
"""

SITE_CONTENT = {
    'practice': {
        'name': 'The Oak Wellness',
        'tagline': 'Strength • Growth • Wellness',
    },
    'hero': {
        'eyebrow': 'Strength • Growth • Wellness',
        'title': (
            'Every person has the capacity to heal, grow and build a healthier '
            'future.'
        ),
        'subtitle': (
            'The Oak Wellness is a private social work practice dedicated to '
            'strengthening individuals, families, children, adolescents, parents '
            'and employees through professional counselling, coaching and '
            'psychosocial support.'
        ),
        'primary_cta': {'label': 'Book a session', 'href': '/book'},
        'secondary_cta': {'label': 'Our services', 'href': '/services'},
        'highlights': [
            'Social Worker in Private Practice · Reg No: 10-28261',
            'A warm, respectful and confidential environment',
            'A person-centred and strengths-based approach',
        ],
    },
    # Introduction from the social worker, with her photo. The home page shows
    # the first two paragraphs; the About page shows all of them.
    'meet': {
        'title': 'Meet Sinobungcwele Tabita Kwatsha',
        'name': 'Sinobungcwele Tabita Kwatsha',
        'role': 'Social Worker in Private Practice',
        'registration': 'Reg No: 10-28261',
        'paragraphs': [
            'Welcome to The Oak Families and Wellness.',
            (
                'My name is Sinobungcwele Tabita Kwatsha, a qualified and '
                'registered Social Worker with over 15 years of professional '
                'experience supporting children, adolescents, adults and families. '
                'I hold a Bachelor of Social Work degree from the University of '
                'KwaZulu-Natal, as well as certificates in Employee Assistance '
                'Programmes and HIV Care and Counselling from UNISA.'
            ),
            (
                'My passion is to provide a warm, confidential and non-judgmental '
                'environment where every person feels heard, respected and '
                'supported. Through counselling, coaching and practical guidance, '
                'I help individuals navigate emotional difficulties, family and '
                'relationship challenges, workplace concerns and important life '
                'transitions.'
            ),
            (
                'Like a strong oak tree, I believe every person has the ability to '
                'grow, heal and regain strength—even during life’s most difficult '
                'seasons. At The Oak Families and Wellness, you do not have to face '
                'your challenges alone. I am here to walk alongside you on your '
                'journey towards healing, resilience and renewed hope.'
            ),
        ],
    },
    'page_titles': {
        'about': 'About Us',
        'services': 'Our Services',
        'approach': 'Our Approach',
        'contact': 'Contact Details',
        'book': 'Book a Session',
    },
    'about': {
        'paragraphs': [
            (
                'The Oak Wellness is a private social work practice dedicated to '
                'strengthening individuals, families, children, adolescents, '
                'parents and employees through professional counselling, coaching '
                'and psychosocial support.'
            ),
            (
                'Like an oak tree, the practice represents strength, growth, '
                'stability and hope. We provide a warm, respectful and '
                'confidential environment where clients can feel heard, supported '
                'and empowered to overcome challenges and improve their overall '
                'well-being.'
            ),
        ],
        'vision': (
            'To build a trusted and compassionate private social work practice '
            'that empowers children, teenagers, parents and employees to overcome '
            'challenges, strengthen relationships and achieve emotional well-being '
            'in a safe, supportive and confidential environment.'
        ),
        'mission': (
            'To provide compassionate, confidential and professional social work '
            'services that support children, teenagers, parents and employees '
            'through counselling, coaching and practical guidance—helping them '
            'build resilience, strengthen relationships and achieve emotional '
            'well-being.'
        ),
    },
    'values': [
        'Compassion',
        'Integrity',
        'Respect',
        'Confidentiality',
        'Professionalism',
        'Empowerment',
        'Inclusivity',
        'Hope',
    ],
    'services': [
        {
            'slug': 'children',
            'audience': 'Children',
            'items': [
                'Emotional and behavioural support',
                'Adjustment to family or school changes',
                'Grief, loss and trauma support',
                'Confidence and self-esteem development',
                'Age-appropriate life-skills guidance',
            ],
        },
        {
            'slug': 'youth',
            'audience': 'Adolescents and Youth',
            # Optional: shown above and below the list on the Services page.
            'intro': (
                'Adolescence and young adulthood can bring emotional, social and '
                'academic challenges. At The Oak Families and Wellness, we provide '
                'a safe, confidential and supportive environment where young people '
                'can express themselves, develop healthy coping skills and grow in '
                'confidence.'
            ),
            'items': [
                'Individual counselling and emotional support',
                'Adolescent coaching and personal development',
                'Support with anxiety, stress and low self-esteem',
                'Depression, grief and trauma support',
                'Anger management and emotional regulation',
                'Bullying and peer-pressure intervention',
                'Behavioural and disciplinary support',
                'School-related stress and academic difficulties',
                'Career guidance and preparation for adulthood',
                'Substance-use awareness and early intervention',
                'Healthy relationships and responsible decision-making',
                'Family communication and conflict resolution',
                'Support during separation, divorce and other family changes',
                'Life-skills development and goal setting',
                'Crisis support and referral to specialised services when necessary',
            ],
            'outro': (
                'Our goal is to help adolescents and young people recognise their '
                'strengths, make positive choices and move towards a healthy, '
                'hopeful and fulfilling future.'
            ),
        },
        {
            'slug': 'families',
            'audience': 'Parents and Families',
            'items': [
                'Parenting support and guidance',
                'Strengthening parent–child relationships',
                'Family conflict management',
                'Support for parents with children with learning challenges',
                'Healthy communication and coping skills',
            ],
        },
        {
            'slug': 'employees',
            'audience': 'Employees and Workplaces',
            'items': [
                'Employee wellness counselling',
                'Workplace stress and burnout support',
                'Personal and family-related counselling',
                'Grief and trauma support',
                'Conflict management',
                'Work–life balance guidance',
                'Employee wellness education and referrals',
            ],
        },
        {
            'slug': 'individuals',
            'audience': 'Individuals',
            'items': [
                'Individual counselling',
                'Stress and anxiety management',
                'Grief and bereavement support',
                'Relationship challenges',
                'Life transitions and personal development',
                'Trauma-informed emotional support',
            ],
        },
    ],
    'who_we_serve': {
        'intro': 'Our services are available to:',
        'groups': [
            'Children and adolescents',
            'Youth in and out of school',
            'Mothers and parents',
            'Individuals and families',
            'Employees and organisations',
            'People experiencing personal, emotional, family or workplace challenges',
        ],
    },
    'approach': [
        (
            'The Oak Wellness follows a person-centred and strengths-based '
            'approach. Every client is treated with dignity and encouraged to '
            'participate actively in developing practical solutions suited to '
            'their circumstances.'
        ),
        (
            'Services are provided professionally, sensitively and without '
            'judgement. Where additional or specialised assistance is needed, '
            'appropriate referrals are made to relevant professionals and '
            'community resources.'
        ),
    ],
    'commitment': (
        'At The Oak Wellness, we believe that every person has the capacity to '
        'heal, grow and build a healthier future. We are committed to walking '
        'alongside our clients with compassion, professionalism and hope.'
    ),
    'contact': {
        'address_lines': ['134 Kempston Road', 'Gqeberha'],
        'phone': '079 260 4577',
        'phone_href': 'tel:+27792604577',
        # Same number, confirmed by the practice for WhatsApp.
        'whatsapp_href': 'https://wa.me/27792604577',
        'email': 'zenanitab@gmail.com',
    },
}
