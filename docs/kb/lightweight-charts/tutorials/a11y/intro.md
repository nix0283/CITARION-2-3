# Improving accessibility

> Source: https://tradingview.github.io/lightweight-charts/tutorials/a11y/intro

**Description:** This tutorial provides an introduction to making a Lightweight Charts™' chart more accessible.

---

(/lightweight-charts/)
# Improving accessibility

## Introduction[​](#introduction)

This tutorial introduces how to make charts with Lightweight Charts™ more
accessible. Lightweight Charts™ does not have built-in accessibility attributes
and behaviors. This gives you the flexibility to customize and implement them on
your own, seamlessly integrating the charts into your site's existing
accessibility policy.

infoThe tutorial serves as a starting point and provides ideas
for creating a fully accessible chart based on your users' needs. **It is not
intended to be a comprehensive tutorial.**

Graphical data representation, although visually appealing and informative, can
sometimes pose challenges to individuals with varying abilities and needs. In
line with the principles of inclusivity and universal design, we aim to
demonstrate how to make your charts more accessible to a broader audience.

## What we will be building[​](#what-we-will-be-building)

Before we get started, let us have a look at what we will be building in this
tutorial.

- [
View in a new window

](/lightweight-charts/056b6ae28c3a0b8b735f4f7a5f1b0977.html)
- [
Download the file

](/lightweight-charts/056b6ae28c3a0b8b735f4f7a5f1b0977.html)

## Topics to be covered[​](#topics-to-be-covered)

The following topics will be covered within the tutorial:

- **Enabling Keyboard Navigation:** Keyboard users predominantly interact with
web content using only their keyboard. We will guide you on setting up
keyboard navigation for our charts, thereby providing a seamless user
experience.

- **Implementing ARIA (Accessible Rich Internet Applications) Suite:** We'll
delve into how to integrate ARIA attributes which aid in improving the access
and understanding of our charts for users with disabilities.

- **Generating Descriptive Content for Charts:** Often, providing a textual
description for charts becomes invaluable for certain users, especially for
those using screen reading technology. We demonstrate how to automate this
process and facilitate a more comprehensive understanding of data being
represented.

## Prerequisite knowledge[​](#prerequisite-knowledge)

To fully benefit from this guide, we assume that you are already familiar with:

- Basic HTML structure and elements.

- JavaScript fundamentals, especially event handling.

- The basics of using the Lightweight Charts™ JavaScript library, including chart
creation and providing data.

tipThe tutorial will assume that you've already read the [Getting Started](/lightweight-charts/docs)
section. Additionally it is recommended that you read the
[Customization tutorial](/lightweight-charts/tutorials/customization/intro)

## Terminology[​](#terminology)

- **Accessibility:** The practice of making your websites usable by as many
people as possible, including individuals with disabilities or special needs.

- **ARIA (Accessible Rich Internet Applications):** A set of attributes that
define ways to make web content and web applications more accessible to people
with disabilities.

- **Assistive technologies:** Software or devices that people with disabilities
use to improve interaction with the web, such as screen readers, alternative
keyboards, or speech recognition software.

- **Keyboard Navigation:** The ability to navigate through a website using only
the keyboard, which is important for those who cannot use a mouse.

- **High Contrast Mode:** A version of a webpage that has been designed to be
easy on the eyes and readable, typically with black text on a white
background, used by people with visual impairments.

- **Media Queries:** A CSS technique used to apply different style rules to
different devices based on their characteristics, such as color scheme
preference (such as high contrast), display type, height, width, etc.

- **Screen Reader:** A type of software that interprets and reads aloud the
information displayed on a screen, such as text, images, buttons, and menus.
It's primarily used by people with visual impairments or those who have
difficulties reading text on a screen. Examples include JAWS, NVDA, and
VoiceOver.