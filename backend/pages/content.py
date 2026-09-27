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
            'items': [
                'Adolescent coaching',
                'Emotional and behavioural support',
                'Self-esteem and identity development',
                'Peer-pressure and relationship guidance',
                'School-related stress and adjustment',
                'Support for youth in and out of school',
                'Goal-setting and life-skills development',
            ],
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
            'slug': 'mothers',
            'audience': 'Mothers and Babies',
            'items': [
                'Emotional support during pregnancy and motherhood',
                'Adjustment to parenting',
                'Maternal wellness support',
                'Strengthening the mother–baby bond',
                'Referral to appropriate community and professional services when required',
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
        'email': 'zenanitab@gmail.com',
    },
}
