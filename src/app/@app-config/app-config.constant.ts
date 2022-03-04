export class AppConfig {

    public static DEPARTMENT_CODE = [
        '001 - Front Office',
        '029 - Back Office',
        '101 - Front Desk',
        '153 - Main Office',
    ];
    public static CATEGORY = [
        'House Loan',
        'Car Loan',
        'Personal Loan'
    ];

 

    public static CLIAM = 'Claim';
    public static INSURANCE = 'Insurance';
    public static BOTH = 'Both';

    public static ISSUE_TYPE = [
        AppConfig.CLIAM,
        AppConfig.INSURANCE,
        AppConfig.BOTH,
    ];

    public static FAMILY_LOCAL ='Local';
    public static FAMILY_NATIONAL ='National';
    public static FAMILY_INTERNATION ='International';


    public static FAMILTY = [
        AppConfig.FAMILY_LOCAL,
        AppConfig.FAMILY_NATIONAL,
        AppConfig.FAMILY_INTERNATION,
    ];

 
    public static FAMILTY_DIVISION = {
        LOCAL: [
            'Howrah, Park Street (Family Division) etc.'
        ],
        NATIONAL: [
            'Howrah, Park Street (Family Division) etc.'
        ],
        INTERNATION: [
            'Howrah, Park Street (Family Division) etc.'
        ]
    }
    public static snackBar = {
        Duration: 2000,
        DurationError: 5000,
        VerticalPosition: 'bottom',
        HorizontalPosition: 'end',
        PanelClass: ['snackbar-message']
    };
}