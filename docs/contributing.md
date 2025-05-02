# Contribute

Thank you for your interest in contributing to our competency framework! This guide is designed to help both technical and non-technical users make contributions to improve the framework.

## Ways to Contribute

There are multiple ways to contribute to this project depending on your technical comfort level:

1. **Create an Issue (Recommended for non-technical users)**
2. **Submit a Pull Request (For users comfortable with Git)**

## Option 1: Creating an Issue (Non-Technical Approach)

Creating an issue is the simplest way to suggest changes, report errors, or propose additions to the competency framework.

### How to Create an Issue:

1. **Navigate to the [GitHub repository](https://github.com/UoM-Data-Science-Platforms/sde-skills)** for this project
2. Click on the [**"Issues"**](https://github.com/UoM-Data-Science-Platforms/sde-skills/issues) tab near the top of the page
3. Click the green **"New issue"** button
4. Fill in the following information:
   - **Title**: A brief summary of your suggestion or issue
   - **Description**: Include as much detail as possible:
     - Which competency or competencies you're referring to
     - What changes you're suggesting
     - Why this change would be beneficial
     - Any relevant examples or resources

5. Click **"Submit new issue"** when you're done

### Example Issue Format:

```
Title: Suggest additional skills for Cloud Infrastructure competency

Description:
I would like to suggest adding "Kubernetes administration" as a skill under the
Cloud Infrastructure competency at the Senior level.

This would be valuable because more research environments are adopting containerization
for reproducible research, and Kubernetes skills are increasingly needed for
managing these environments.

Reference: The competency is currently listed on page [insert link or page reference].
```

## Option 2: Submitting Changes via Pull Request

If you're comfortable with Git and GitHub, you can directly propose changes by creating a Pull Request.

### Prerequisites:

- A GitHub account
- Git installed on your computer (for local editing)
- Basic understanding of Markdown formatting

### Steps to Submit a Pull Request:

1. **Fork the repository** by clicking the "Fork" button at the top right of the repository page
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/sde-skills.git
   cd sde-skills
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b your-branch-name
   ```
4. **Make your changes** to the relevant files:
   - Competency descriptions are in the `docs/skills_matrix/` directory
   - Use a text editor to modify the Markdown (.md) files
5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Brief description of your changes"
   ```
6. **Push your changes** to your fork:
   ```bash
   git push origin your-branch-name
   ```
7. **Create a Pull Request**:
   - Go to the original repository
   - Click "Pull Requests" and then "New Pull Request"
   - Click "compare across forks"
   - Select your fork and branch
   - Click "Create Pull Request"
   - Fill in the details of your changes

## Guidelines for Contributions

Whether creating an issue or a pull request, please:

1. **Be specific** about which competency or section you're addressing
2. **Provide rationale** for why the change would be beneficial
3. **Include references** where appropriate (e.g., industry standards, academic papers)
4. **Use clear, concise language** that's accessible to all readers
5. **Follow the existing format** if you're editing documents directly

## Getting Help

If you need assistance with the contribution process:

- For technical help with Git or GitHub, refer to [GitHub's documentation](https://docs.github.com/en)
- For questions about the competency framework itself, please create an issue with the "question" label

Thank you for helping improve the Research Technical Professionals Competency Framework!
