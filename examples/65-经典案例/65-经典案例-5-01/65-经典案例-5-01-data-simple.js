const data = {
    nodes: [
        {
            "id": "aaa",
            "label": "aaa",
        },
        {
            "id": "employee",
            "label": "Employee",
        },
        {
            "id": "job",
            "label": "Job",
        },
        {
            "id": "dept",
            "label": "Department",
        },
    ],
    edges: [
        {
            "id": "aaa-employee",
            "source": "aaa",
            "target": "employee",
        },
        {
            "id": "employee-job",
            "source": "employee",
            "target": "job",
        },
        {
            "id": "employee-dept",
            "source": "employee",
            "target": "dept",
        },
    ],
}

export default data