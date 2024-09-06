


function roleCheck(employeeDetails) {
    if (employeeDetails.role_name === "Director") {
        return superAdminSidebar;
    } else if (employeeDetails.role_name === "Team Incharge") {
        return teamLeadSidebar;
    }
    else if (employeeDetails.role_name.toLowerCase() === "manager") {
        return mangerSidebar;
    } else {
        return employeeSidebar; // Default to employeeSidebar if no match

    };


}