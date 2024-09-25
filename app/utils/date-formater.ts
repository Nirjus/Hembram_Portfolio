export function formatDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const suffix = (day: number) => {
        if (day > 3 && day < 21) return 'th'; // Special case for 11th to 13th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${suffix(day)} ${monthNames[month - 1]} ${year}`;
}
