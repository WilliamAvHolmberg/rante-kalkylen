# Räntekalkyl - Open Source Interest Rate Calculator

## 🚧 Warning: Project in Raw Dog Mode 🚧

This project is currently in what we affectionately call "raw dog mode". It's a work in progress with many AI-generated features and crowd-sourced information. Expect rough edges, potential inaccuracies, and a wild ride!

## What is this?

Räntekalkyl is an open-source application designed to help users calculate and compare different mortgage interest rate options in Sweden. It leverages crowd-sourced information to provide forecasts for future rates and collects data on users' current rates to give a comprehensive view of the market.

## Key Features

- Calculate and compare different räntebindning (fixed-rate) options
- Crowd-sourced interest rate forecasts
- Anonymous sharing of current mortgage rates
- Open-source codebase for transparency and community contributions


## Getting Started

To run the project locally:

```bash
cd packages/web && npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

We welcome contributions! However, please note that due to the current "raw dog" state of the project, the codebase might be messy and hard to navigate. We appreciate your patience and understanding.

If you're brave enough to dive in:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Disclaimer

This project is for educational and informational purposes only. The calculations and forecasts provided should not be considered as financial advice. Always consult with a qualified financial advisor before making any decisions about your mortgage or other financial matters.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to all the brave souls contributing their rate information
- Shoutout to the AI assistants helping to generate features (and potentially bugs)
- Your name could be here! Contribute and join the list

Remember: In "raw dog" we trust, but verify before you mortgage!




# Mortgage Rate Forecast Platform Roadmap

## Phase 1: Data Collection and Processing
- [ ] Extract forecasts from all banks
  - [ ] Implement PDF parsing functionality
  - [ ] Integrate OpenAI API for data extraction
- [ ] Set up nightly cron job to update forecasts
- [ ] Develop automated news article summarizer
  - [ ] Extract forecasts from news articles
- [ ] Integrate with Telegram bot for daily notifications
- [ ] Implement user feedback system
  - [ ] Set up Telegram channel for receiving user feedback
  - [ ] Create process for reviewing and addressing user feedback

## Phase 2: User Interface and Customization
- [ ] Implement forecast selection feature
  - [ ] Allow users to choose which forecasts to view
- [ ] Create loan management system
  - [ ] Enable users to input their current loans
  - [ ] Display best forecasts based on user's loan portfolio

## Phase 3: User-Generated Content
- [ ] Develop forecast upload functionality
  - [ ] Allow users to submit their own forecasts
- [ ] Create a browsing system for user-generated forecasts

## Phase 4: Community Engagement
- [ ] Implement voting system for forecast accuracy
- [ ] Design points and badges system for user contributions
- [ ] Develop commenting and discussion features for forecasts

## Phase 5: Advanced Features and Optimization
- [ ] Refine UI/UX based on user feedback
- [ ] Implement advanced analytics for forecast comparison
- [ ] Optimize performance and scalability

## Future Considerations
- [ ] Mobile app development
- [ ] Integration with financial planning tools
- [ ] Partnerships with financial institutions

