"""Run from the folder that contains backend1/:  python -m unittest backend1.tests.test_overall_verdict -v
(also works with pytest)."""
import unittest

from backend1.services.verification_service import overall_verdict

S, U, M, C = "SUPPORTED", "UNVERIFIED", "MISLEADING", "CONTRADICTED"


class OverallVerdictTests(unittest.TestCase):
    def test_4_supported(self):
        self.assertEqual(overall_verdict([S] * 4), "SUPPORTED")

    def test_3_supported_1_unverified(self):
        self.assertEqual(overall_verdict([S, S, S, U]), "SUPPORTED")

    def test_2_supported_2_unverified_is_supported(self):  # 50% rule beats the 75% rule
        self.assertEqual(overall_verdict([S, S, U, U]), "SUPPORTED")

    def test_1_supported_3_unverified_is_misleading(self):
        self.assertEqual(overall_verdict([S, U, U, U]), "MISLEADING")

    def test_4_unverified_is_misleading(self):
        self.assertEqual(overall_verdict([U] * 4), "MISLEADING")

    def test_1_supported_1_unverified_is_supported(self):
        self.assertEqual(overall_verdict([S, U]), "SUPPORTED")

    def test_empty_is_unverified(self):
        self.assertEqual(overall_verdict([]), "UNVERIFIED")

    def test_never_partial_and_boundaries(self):
        # 1 supported of 3 = 33% (<50%); 2 flagged of 3 = 66.7% (<75%) -> UNVERIFIED, not PARTIAL
        self.assertEqual(overall_verdict([S, U, M]), "UNVERIFIED")
        # 1 supported of 5 = 20%; 4 flagged of 5 = 80% -> MISLEADING
        self.assertEqual(overall_verdict([S, C, M, U, U]), "MISLEADING")
        # exactly 75% flagged -> MISLEADING (1 of 4 supported is <50%)
        self.assertEqual(overall_verdict([S, C, C, C]), "MISLEADING")
        # 1 supported of 3 is below 50% even though 1/3 rounds oddly
        self.assertEqual(overall_verdict([S, S, U, U, U]), "UNVERIFIED")  # 40% sup, 60% flagged
        import itertools
        for n in range(0, 7):
            for combo in itertools.product([S, U, M, C], repeat=n):
                self.assertIn(overall_verdict(list(combo)), {S, U, M, C})


if __name__ == "__main__":
    unittest.main()
